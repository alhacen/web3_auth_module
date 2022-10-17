import Web3 from "web3";
import { getWalletInfo } from "./utils/get_wallet_info";
import { createWeb3Modal } from "./utils/create_web3_modal";
import { switchNetwork } from "./utils/switch_network";

export const authPlugin = {
    install(Vue, options) {
        const { networks } = options;
        Vue.mixin({
            data: () => ({
                walletAddress: null,
                chainId: null,
                wallet: {},
                supportedWallets: [
                    {
                        name: "Metamask",
                        id: "custom-metamask",
                        info: "Connect using Brower wallet",
                        img: "wallet/metamask.svg",
                    },
                    {
                        name: "Coinbase",
                        id: "walletlink",
                        info: "Connect using Coinbase wallet",
                        img: "wallet/coinbase.svg",
                    },
                    {
                        name: "WalletConnect",
                        id: "walletconnect",
                        info: "Connect using mobile wallet",
                        img: "wallet/wallet-connect.svg",
                    },
                ],
                networks,
            }),
            methods: {
                ChangeNetwork(network) {
                    switchNetwork(this.provider, network);
                },
                async ConnectWallet(walletName) {
                    let web3Modal = createWeb3Modal(true, networks);
                    if (!walletName) {
                        walletName = web3Modal.cachedProvider;
                    }
                    this.provider = await web3Modal.connectTo(walletName);
                    this.walletAddress = this.provider.selectedAddress;
                    window.localStorage.setItem("isWalletConnected", true);
                    let web3 = new Web3(this.provider);
                    let chainId = await web3.eth.getChainId();
                    this.chainId = chainId;
                    this.provider.on("accountsChanged", (accounts) => {
                        // console.log(11, accounts);
                        this.walletAddress = accounts[0];
                    });
                    this.provider.on("chainChanged", (chainId) => {
                        this.chainId = Web3.utils.toDecimal(chainId);
                    });
                    this.wallet = getWalletInfo(this.provider);
                    console.log(this.wallet);
                },
                DisconnectWallet() {
                    if (!this.provider) return;
                    this.provider.removeAllListeners();
                    this.provider = null;
                    localStorage.setItem("isWalletConnected", false);
                    console.log("disconnected");
                    this.walletAddress = null;
                    this.chainId = null;
                },
            },
            mounted() {
                addEventListener("storage", (event) => {
                    console.log(this._data, event);
                });

                let isWalletConnected = JSON.parse(
                    window.localStorage.getItem("isWalletConnected")
                );
                if (isWalletConnected) {
                    this.ConnectWallet();
                } else if (window.provider) {
                    this.DisconnectWallet();
                }
            },
            computed: {
                $meta() {
                    return this._data;
                },
            },
            created: function () {},
        });
    },
};
