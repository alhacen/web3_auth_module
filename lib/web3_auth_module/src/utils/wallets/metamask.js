import { getProviderInfoByName } from "web3modal";
import { ETHEREUM } from "../../constants";
import { LocalStorage } from "../local_storage";
import { LOCAL_STORAGE_KEY } from "../../enums";

export const metamask = {
    display: {
        logo: getProviderInfoByName("MetaMask").logo,
        name: "MetaMask",
        description: "Connect to your MetaMask Wallet",
    },
    package: true,
    async connector() {
        const handleMetamaskNotInstalled = () => {
            // window.open(
            //   "https://metamask.io/download/",
            //   "_blank"
            // );
        };

        const connectToMetaMask = async (provider) => {
            if (LocalStorage.get(LOCAL_STORAGE_KEY.IsConnectedToWallet)) {
                const addresses = await provider.request({
                    method: "eth_accounts",
                });
                if (addresses.length === 0) {
                    return LocalStorage.remove(
                        LOCAL_STORAGE_KEY.IsConnectedToWallet
                    );
                    // throw new Error('user is not logged into metamask');
                }
            }
            await provider.request({ method: "eth_requestAccounts" });
            return provider;
        };

        // Case 1: There is no injected provider available
        // Resolution: Open MetaMask download in new tab
        if (window.ethereum == undefined) {
            //console.log("No Injected Providers Available");
            handleMetamaskNotInstalled();
            return;
        }
        // Case 2: There are multiple providers available.
        // Resolution: Check if an injected provider is Metamask,
        //  if true, return the provider. If false, open MetaMask download
        //  in new tab.
        else if (ETHEREUM.providers !== undefined) {
            let providers = ETHEREUM.providers;
            let provider = providers.find((p) => p.isMetaMask); // <-- LOOK HERE
            if (provider) {
                return connectToMetaMask(provider);
            } else {
                //console.log("MetaMask not an available provider");
                handleMetamaskNotInstalled();
                return;
            }
        }
        // Case 3: There is one injected provider available.
        // Resolution: If it is MetaMask, return the provider.
        //  Otherwise, open download in new tab.
        else if (ETHEREUM.providers == null && ETHEREUM.isMetaMask == true) {
            //console.log("MetaMask is the single injected provider");
            let provider = ETHEREUM;
            return connectToMetaMask(provider);
        } else {
            handleMetamaskNotInstalled();
            return;
        }
    },
};
