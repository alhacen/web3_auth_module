import Web3 from "web3";
import { getWalletInfo } from "./utils/get_wallet_info";
import { createWeb3Modal } from "./utils/create_web3_modal";
import { switchNetwork } from "./utils/switch_network";
export let web3Object = {
    provider: null,
};
class Wallet {
    address = null;
    networks = null;
    chainId = null;
    connectedWallet = {};
    supportedWallets = [
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
    ];
    constructor(data) {
        const { networks } = data;
        this.networks = networks;
        let isWalletConnected = JSON.parse(
            window.localStorage.getItem("isWalletConnected")
        );
        if (isWalletConnected) {
            this.ConnectWallet();
        } else if (web3Object.provider) {
            this.DisconnectWallet();
        }
    }
    ChangeNetwork = (network) => {
        switchNetwork(web3Object.provider, network);
    };
    ConnectWallet = async (walletName) => {
        let web3Modal = createWeb3Modal(true, this.networks);
        if (!walletName) {
            walletName = web3Modal.cachedProvider;
        }
        web3Object.provider = await web3Modal.connectTo(walletName);
        this.address = web3Object.provider.selectedAddress;
        window.localStorage.setItem("isWalletConnected", true);
        let web3 = new Web3(web3Object.provider);
        let chainId = await web3.eth.getChainId();
        this.chainId = chainId;
        web3Object.provider.on("accountsChanged", (accounts) => {
            this.address = accounts[0];
        });
        web3Object.provider.on("chainChanged", (chainId) => {
            this.chainId = Web3.utils.toDecimal(chainId);
        });
        this.connectedWallet = getWalletInfo(web3Object.provider);
    };
    DisconnectWallet = (walletName) => {
        if (!web3Object.provider) return;
        web3Object.provider.removeAllListeners();
        web3Object.provider = null;
        localStorage.setItem("isWalletConnected", false);
        console.log("disconnected");
        this.address = null;
        this.chainId = null;
        this.connectedWallet = {};
    };
}
export default Wallet;
