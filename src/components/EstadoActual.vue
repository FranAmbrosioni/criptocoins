<template>
    <div>
        <h3>Estado Actual</h3>
        <div  class="" v-if="$store.state.totalBTC > 0|| $store.state.totalETH > 0 || $store.state.totalUSDT > 0|| $store.state.totalXLM > 0"  >
        <table>
            <thead>
                <tr>
                    <th scope="col">Coin</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio Actual</th>
                </tr>
            </thead>
        
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
            <tr v-show="$store.state.totalXLM > 0">
                <td>{{XLM}}</td>
                <td>{{$store.state.totalXLM}}</td>
                <td>$ {{$store.state.priceXLM }}</td>
            </tr>
        </tbody>
    </table>
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
    XLM: 'XLM',
    };
},
computed:
        mapState(
        { usuario: (state) => state.user, },
        ),
...mapGetters(['getBTCPrice', 'getETHPrice', 'getUSDTPrice', 'getXLMPrice','getCoins']),
methods: {
    ...mapMutations(['getCurrentPriceBTC', 'getCurrentPriceETH', 'getCurrentPriceUSDT', 'getCurrentPriceXLM']),
}
};
</script>
<style scoped>

.tablecontainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 100px auto;

}

table{
    background-color: white;
    text-align: center;
    width: 100%;
    border-collapse: collapse;


}
th,td{
    border: solid 1px black;
    padding: 0;
}

thead{
    background-color: #246355;
    border-bottom: solid 5px #0f362d ;
    color: white;

}

tr:nth-child(even){
    background-color: #ddd;

}

tr:hover{
    background-color: #369681;
    color: white;
}
</style>