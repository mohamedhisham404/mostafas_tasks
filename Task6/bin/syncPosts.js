import axios from "axios";
import { Command } from "commander";
import {
    testDatabaseConnection,
    syncDatabase,
} from "../../config/connectDB.js";
import Post from "../models/post.js";
import sequelize from "../../config/database.js";

const program = new Command();

program
    .version("1.0.0")
    .description("CLI tool to sync posts from external API");

program
    .command("sync")
    .description("Sync posts from external API")
    .action(async () => {
        try {
            await testDatabaseConnection();
            await syncDatabase();

            console.log("Fetching posts from external API...");

            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );

            const externalPosts = response.data;

            console.log(`Found ${externalPosts.length} posts. Syncing...`);

            await Post.bulkCreate(externalPosts, {
                updateOnDuplicate: ["title", "body"],
            });

            console.log("Posts synced successfully.");

            await sequelize.query(`
                SELECT setval(
                    pg_get_serial_sequence('"Posts"', 'id'), 
                    COALESCE((SELECT MAX(id) FROM "Posts"), 0) + 1, 
                    false
                );
            `);

            process.exit(0);
        } catch (error) {
            console.error("Error syncing posts:", error.message);
            process.exit(1);
        }
    });

program.parse(process.argv);
