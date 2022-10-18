<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between text-xl font-bold">
      Available networks
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
</template>
