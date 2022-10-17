import nodePolyfills from "rollup-plugin-polyfill-node";
const production = process.env.NODE_ENV === "production";
import { createVuePlugin } from "vite-plugin-vue2";

export default {
    plugins: [
        // ↓ Needed for development mode
        createVuePlugin(),
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
        },
        // ↓ Needed for build if using WalletConnect and other providers
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
};
