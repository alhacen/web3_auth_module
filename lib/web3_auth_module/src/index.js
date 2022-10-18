import Wallet, { web3Object } from "./wallet";
import { readonly, reactive } from "vue";
export const authPlugin = {
    install(Vue, options) {
        let wallet = new Wallet(options);
        Vue.prototype.$wallet = reactive(wallet);
        Vue.prototype.$web3 = web3Object;
    },
};
