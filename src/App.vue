<template>
    <div class="h-screen w-full flex justify-center items-center">
      <div class="w-96 h-[400px] bg-[#333333] rounded-xl shadow-2xl flex justify-center items-center flex-col p-4">
        <div v-if="$wallet.address" class="flex w-full flex-grow flex-col gap-4">
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <div class="flex items-center gap-4">
                <img :src="$wallet.connectedWallet.logo" class="h-6" />
                <p class="text-xl font-bold">{{$wallet.connectedWallet.name}}</p>
              </div>
              <p class="font-bold text-gray-700"></p>
            </div>
            <p class="text-sm">{{$wallet.address}}</p>
          </div>
          <div class="flex flex-col gap-2 text-xl font-bold">
            ChainId
            <p class="text-sm">{{$wallet.chainId}}</p>
          </div>
          <AvailableNetworks />
          <div class="flex flex-col gap-2"></div>
        </div>
        <Logout v-if="$wallet.address" />
        <Login v-else/>
      </div>
    </div>
</template>
<script>
import Login from './components/login.vue'
import Logout from './components/logout.vue'
import AvailableNetworks from './components/available_networks.vue'
export default {
    components:{
        Login,
        Logout,
        AvailableNetworks
    },
       
}
</script>
<style >
   
</style>
