import Web3 from "web3";

// register and switch to matic network in metamask
// provider example is - window.ethereum in case of metamask
export async function switchNetwork(provider, newNetwork) {
    const web3obj = new Web3(provider);
    const chainIdToUse = newNetwork.chainId;
    const chainIdHex = web3obj.utils.toHex(chainIdToUse);
    try {
        await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chainIdHex }],
        });
    } catch (error) {
        if (error.code === 4902) {
            try {
                await provider.request({
                    id: 1,
                    jsonrpc: "2.0",
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: chainIdHex,
                            chainName: newNetwork.name,
                            rpcUrls: [newNetwork.rpc],
                            nativeCurrency: {
                                name: "ETHER",
                                symbol: "ETH",
                                decimals: 18,
                            },
                            blockExplorerUrls: [newNetwork.explorer],
                        },
                    ],
                });

                return true;
            } catch (error) {
                throw error;
            }
        } else {
            throw error;
        }
    }
}

//rename to switch to polygon
