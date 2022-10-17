import Web3Modal from "web3modal";

import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { metamask } from "./wallets";

export function createWeb3Modal(isRoot, networks) {
    const targetNetwork = isRoot ? networks.mainnet : networks.testnet;
    const chainId = targetNetwork.chainId;
    const rpc = targetNetwork.rpc;
    const web3Modal = new Web3Modal({
        // network: Vue.appConfig.networks.child.name.toLowerCase() || "testnet", // optional
        // network: network, // optional
        disableInjectedProvider: true, // window.ethereum && !window.ethereum.isMetaMask,
        cacheProvider: true, // optional
        providerOptions: {
            "custom-metamask": metamask,
            walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                    chainId: chainId,
                    rpc: {
                        [networks.testnet.chainId]: networks.testnet.rpc,
                        [networks.mainnet.chainId]: networks.mainnet.rpc,
                    },
                    // network: targetNetwork.name
                },
            },
            walletlink: {
                package: CoinbaseWalletSDK, // Required
                options: {
                    appName: "Polygon Wallet Web",
                    chainId: chainId,
                    rpc: rpc,
                },
            },

            // fortmatic: {
            //   package: Fortmatic, // required
            //   options: {
            //     key: "FORTMATIC_KEY" // required
            //   }
            // },
        },
    });
    return web3Modal;
}
