import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [
        vue(),
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],
            imports: [
                "vue",
                {
                    "@vueuse/core": ["useMouse", ["useFetch", "useMyFetch"]],
                    axios: [["default", "axios"]],
                },
            ],
            dts: "./src/auto-imports.d.ts",
        }),
        Components({
            dts: "./src/components.d.ts",
        }),
    ],
});
