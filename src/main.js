import Vue from "vue";
import "./style.css";
import App from "./App.vue";
import { authPlugin } from "web3_auth_module/src";
Vue.use(authPlugin, {
    networks: {
        mainnet: {
            chainId: 1,
            explorer: "https://etherscan.io",
            name: "Ethereum",
            rpc: "https://rpc.ankr.com/eth/486f6d938d85e35aeacf83a59afd95c4fab739093c8f919adb258799d81d51bf",
            version: "v1",
        },
        matic: {
            chainId: 137,
            explorer: "https://polygonscan.com",
            name: "Polygon",
            rpc: "https://rpc.ankr.com/polygon/486f6d938d85e35aeacf83a59afd95c4fab739093c8f919adb258799d81d51bf",
        },
        testnet: {
            chainId: 5,
            explorer:
                "https://goerli.infura.io/v3/295cce92179b4be498665b1b16dfee34",
            name: "Goerli",
            rpc: "https://goerli.infura.io/v3/295cce92179b4be498665b1b16dfee34",
            version: "mumbai",
        },
    },
});
const plugin = {
    install(Vue, options) {
        Vue.mixin({
            data: () => ({
                myName: "hqhqhq",
            }),
            computed: {
                $sayMyName() {
                    return this.myName;
                },
            },
            beforeCreate: function () {
                registerPlugin(this);
            },
        });
    },
};
function registerPlugin(vm) {
    if (vm.$root.myName) {
        Object.keys(vm.$options.computed).forEach((_) => {
            console.log(vm.$options.computed, vm.$root.$options.computed);
            vm.$options.computed = vm.$root.$options.computed;
        });
        // vm.$options.myName = vm.$root.myName;
    }
}
Vue.use(plugin);
new Vue({
    render: (h) => h(App),
}).$mount("#app");
