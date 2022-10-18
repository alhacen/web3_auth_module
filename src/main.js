import Vue from "vue";
import "./style.css";
import App from "./App.vue";
import { authPlugin } from "web3_kit";
Vue.use(authPlugin, {
    networks: {
        mainnet: {
            chainId: 1,
            name: "Ethereum",
            rpc: "https://mainnet.infura.io/v3/",
            version: "v1",
            nativeCurrency: {
                name: "ETHER",
                symbol: "ETH",
                decimals: 18,
            },
        },
        matic: {
            chainId: 137,
            name: "Polygon",
            rpc: "https://polygon-rpc.com",
            nativeCurrency: {
                name: "ETHER",
                symbol: "ETH",
                decimals: 18,
            },
        },
        testnet: {
            chainId: 5,
            name: "Goerli",
            rpc: "https://goerli.infura.io/v3/",
            version: "mumbai",
            nativeCurrency: {
                name: "ETHER",
                symbol: "ETH",
                decimals: 18,
            },
        },
    },
});
new Vue({
    render: (h) => h(App),
}).$mount("#app");
