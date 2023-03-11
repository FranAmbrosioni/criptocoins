<template>
    <div>
        <h3>Estado Actual</h3>
        <div v-if="$store.state.totalBTC > 0|| $store.state.totalETH > 0 || $store.state.totalUSDT > 0|| $store.state.totalADA > 0"  >
        <table>
            <thead>
                <tr>
                    <th>Coin</th>
                    <th>Cantidad</th>
                    <th>Precio Actual</th>
                </tr>
            </thead>
        </table>
        <tbody>
            <tr v-show="$store.state.totalBTC > 0">
                <td>{{BTC}}</td>
                <td>{{$store.state.totalBTC}}</td>
                <td>$ {{$store.state.priceBTC }}</td>
            </tr>
            <tr v-show="$store.state.totalETH > 0">
                <td>{{ETH}}</td>
                <td>{{$store.state.totalETH}}</td>
                <td>$ {{$store.state.priceETH }}</td>
            </tr>
            <tr v-show="$store.state.totalUSDT > 0">
                <td>{{USDT}}</td>
                <td>{{$store.state.totalUSDT}}</td>
                <td>$ {{$store.state.priceUSDT }}</td>
            </tr>
            <tr v-show="$store.state.totalADA > 0">
                <td>{{ADA}}</td>
                <td>{{$store.state.totalADA}}</td>
                <td>$ {{$store.state.priceADA }}</td>
            </tr>
        </tbody>
        </div>
        <div v-else>
            <p>No posee Criptomonedas</p>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
data() {
    return {
    movements: [],
    seetable: false,
    BTC: 'BTC',
    ETH: 'ETH',
    USDT: 'USDT',
    ADA: 'ADA',
    };
},
computed:
        mapState(
        { usuario: (state) => state.user },
        ),
...mapGetters(['getBTCPrice', 'getETHPrice', 'getUSDTPrice', 'getADAPrice','getCoins']),
methods: {
    ...mapMutations(['getCurrentPriceBTC', 'getCurrentPriceETH', 'getCurrentPriceUSDT', 'getCurrentPriceADA']),
}
};
</script>
<style scoped>

</style>