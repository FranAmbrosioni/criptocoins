<template>
    <div>
        <h3>Analisis Inversión</h3>
        <div>
            <table>
                <thead>
                    <th>Coin</th>
                    <th>Resultado</th>
                </thead>
                <tbody>
                    <tr v-show="$store.state.resultadoBTC != 0">
                        <td>{{BTC}}</td>
                        <td>$ {{$store.state.resultadoBTC}}</td>
                    </tr>
                    <tr v-show="$store.state.resultadoETH != 0">
                        <td>{{ETH}}</td>
                        <td>$ {{$store.state.resultadoETH}}</td>
                    </tr>
                    <tr v-show="$store.state.resutadoADA != 0">
                        <td>{{ETH}}</td>
                        <td>$ {{$store.state.resultadoADA}}</td>
                    </tr>
                    <tr v-show="$store.state.resutadoUSDT != 0">
                        <td>{{USDT}}</td>
                        <td>$ {{$store.state.resultadoUSDT}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </template>
    
    <script>
    import { mapState, mapGetters, mapMutations } from 'vuex';
    
    export default {
    
    data() {
        return {
        movements: [],
        BTC: 'BTC',
        USDT: 'USDT',
        ETH: 'ETH',
        ADA: 'ADA',
        };
    },
    computed:
        mapState({ usuario: (state) => state.user }),
    ...mapGetters(['getBTCPrice', 'getETHPrice', 'getUSDTPrice', 'getADAPrice']),
    methods: {
        ...mapMutations(['getCurrentPriceBTC', 'getCurrentPriceETH', 'getCurrentPriceUSDT', 'getCurrentPriceADA']),
        changeSeeTable(){
        this.seeTable = true;
        },
    }
    }
    
    </script>
    
    <style >
    .tablecontainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 10px auto;

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
    