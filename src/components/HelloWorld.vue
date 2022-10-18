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
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <p class="text-xl font-bold">ChainId</p>
              <p class="font-bold text-gray-700"></p>
            </div>
            <p class="text-sm">{{$wallet.chainId}}</p>
          </div>
          <!-- {{networks}} -->
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <p class="text-xl font-bold">Available networks</p>
              <p class="font-bold text-gray-700"></p>
            </div>
            <div class="flex gap-4">
              <button 
                v-for="network in $wallet.networks" 
                :key="network.name"
                @click="$wallet.ChangeNetwork(network)"
                :disabled="network.chainId === $wallet.chainId"
              >
                {{network.name}}
              </button>
            </div>
          </div>
          

          <div class="flex flex-col gap-2"></div>
        </div>
        <button v-if="$wallet.address" @click="$wallet.DisconnectWallet">Disconnect Wallet</button>
        <div class="flex flex-col gap-2" v-else>
          <button 
            v-for="wallet in $wallet.supportedWallets"
            :key="wallet.name" 
            @click="$wallet.ConnectWallet(wallet.id)"
          >
            Connect {{wallet.name}}
          </button>
        </div>
      </div>
      <!-- <HelloWorld /> -->
    </div>
</template>
<script>
export default {
    components:{
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
