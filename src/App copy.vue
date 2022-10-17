<template>
    <div class="h-screen w-full flex justify-center items-center">
      {{$sayMyName}}
      <div class="w-96 h-[400px] bg-[#333333] rounded-xl shadow-2xl flex justify-center items-center flex-col p-4">
        <div v-if="walletAddress" class="flex w-full flex-grow flex-col gap-4">
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <div class="flex items-center gap-4">
                <img :src="wallet.logo" class="h-6" />
                <p class="text-xl font-bold">{{wallet.name}}</p>
              </div>
              <p class="font-bold text-gray-700"></p>
            </div>
            <p class="text-sm">{{walletAddress}}</p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <p class="text-xl font-bold">ChainId</p>
              <p class="font-bold text-gray-700"></p>
            </div>
            <p class="text-sm">{{chainId}}</p>
          </div>
          <!-- {{networks}} -->
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <p class="text-xl font-bold">Available networks</p>
              <p class="font-bold text-gray-700"></p>
            </div>
            <div class="flex gap-4">
              <button 
                v-for="network in networks" 
                :key="network.name"
                @click="ChangeNetwork(network)"
                :disabled="network.chainId === chainId"
              >
                {{network.name}}
              </button>
            </div>
          </div>
          

          <div class="flex flex-col gap-2"></div>
        </div>
        <button v-if="walletAddress" @click="DisconnectWallet">Disconnect Wallet</button>
        <div class="flex flex-col gap-2" v-else>
          <button 
            v-for="wallet in supportedWallets"
            :key="wallet.name" 
            @click="ConnectWallet(wallet.id)"
          >
            Connect {{wallet.name}}
          </button>
        </div>
      </div>
      <!-- <HelloWorld /> -->
    </div>
</template>
<script>
import HelloWorld from "./components/HelloWorld.vue"
export default {
    components:{
      HelloWorld
    },
    data:()=>({
    }),
    props:{
        isActive: {
            type: Boolean
        }
    },
    mounted(){
      
    },
    computed:{

    },
    
}
</script>
<style >
   
</style>
