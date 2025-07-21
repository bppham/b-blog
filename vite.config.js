import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.js",
                "resources/js/auth.js",
                "resources/js/home.js",
                "resources/js/blog.js",
                "resources/js/bootstrap.js",
                "resources/js/header.js",
                "resources/js/myBlogs.js",
                "resources/js/sidebar.js",
            ],
            refresh: true,
        }),
        tailwindcss(),
    ],
});
