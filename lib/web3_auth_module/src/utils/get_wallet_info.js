import { getProviderInfo, getProviderInfoById } from "web3modal";

export function getWalletInfo(provider, state) {
  let providerInfo = getProviderInfo(provider);
  if (providerInfo.name.match(/web3/i)) {
    let cachedProvider = state.web3Modal.cachedProvider;
    cachedProvider = cachedProvider === 'custom-venly' ? 'venly' : cachedProvider;
    providerInfo = getProviderInfoById(cachedProvider);
  }
  return providerInfo;
}
