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
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
            imports: [
                "vue",
                {
                    "@vueuse/core": ["useMouse", ["useFetch", "useMyFetch"]],
                    axios: [["default", "axios"]],
                    pinia: ["storeToRefs"],
                },
            ],
            dts: "./src/auto-imports.d.ts",
        }),
        Components({
            dts: "./src/components.d.ts",
        }),
    ],
});
