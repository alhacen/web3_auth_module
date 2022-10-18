import nodePolyfills from "rollup-plugin-polyfill-node";
const production = process.env.NODE_ENV === "production";
const path = require("path");
export default {
    plugins: [
        // ↓ Needed for development mode
        !production &&
            nodePolyfills({
                include: [
                    "node_modules/**/*.js",
                    new RegExp("node_modules/.vite/.*js"),
                ],
            }),
    ],

    build: {
        rollupOptions: {
            plugins: [
                // ↓ Needed for build
                nodePolyfills(),
            ],
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ["vue"],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: "Vue",
                },
            },
        },
        // ↓ Needed for build if using WalletConnect and other providers
        commonjsOptions: {
            transformMixedEsModules: true,
        },

        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            name: "MyLib",
            fileName: (format) => `wallet.${format}.js`,
        },
    },
};
