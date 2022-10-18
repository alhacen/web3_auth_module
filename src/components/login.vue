<template>
    <div class="flex flex-col gap-2">
        <button 
            v-for="wallet in $wallet.supportedWallets"
            :key="wallet.name" 
            @click="$wallet.ConnectWallet(wallet.id)"
        >
            Connect {{wallet.name}}
        </button>
    </div>
</template>
