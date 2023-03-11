<template>
    <div class="about">
        <h2>Compra</h2>
        <hr>
    </div>

    <h3>Selecciona la Moneda a Comprar</h3>

    <div>
        <div v-if="view ===1">
            <button @click="Cripto(btc)">Bitcoin</button>
            <button @click="Cripto(usdt)">Tether</button>
            <button @click="Cripto(ada)">Cardano</button>
            <button @click="Cripto(eth)">Ethereum</button>

        <div v-show="seeTable">
            <TablaCompra :agencies="agencies" :view="view" @change-view="changeView" @sendCoin="selectAgency">
            </TablaCompra>
        </div>
    </div>
    <div v-else-if="view ===2">
        <Comprar :type="type" :selectedCoin="selectedCoin" :view="view" @change-view="changeView" :coin="coin" :agencies="agencies" @registrar="registrar"></Comprar>
    </div>

    </div>
</template>

<script>
import CoinServices from '@/services/CoinServices';
import TablaCompra from '@/components/TablaCompra.vue';
import Comprar from '@/components/Comprar.vue';
import Login from '@/components/LogIn.vue';
import {mapState, mapActions} from 'vuex';

export default {
name: 'Compra',
components: {
    TablaCompra,
    Comprar,
    Login,
},
data() {
    return {
    agencies: [],
    coin: '',
    view: 1,
    selectedCoin: '',
    dateTime: '',
    type: 'purchase',
    btc: 'btc',
    eth: 'eth',
    ada: 'ada',
    usdt: 'usdt',
    seeTable: false,
    };
},
computed:
    mapState({ usuario: (state) => state.user,}),
methods: {
    ...mapActions(['setMovements']),
    Cripto(value) {
    debugger;
    this.coin = value;
    CoinServices.getCoins(this.coin)
        .then((response) => {
        this.agencies = response.data;})
        .then(() => this.changeSeeTable());
    },
    changeView() {
    if (this.view === 1) {
        this.view = 2;
    } 
    else {
        this.view = 1;
    }
    },
    changeSeeTable() {
    this.seeTable = true;
    },
    selectAgency(selected) {
    this.selectedCoin = selected;
    },
    registrar(cantidadCripto, montoPesos) {
    const date = new Date();
    this.dateTime = new Date(
        parseInt(date.getFullYear()),
        parseInt(date.getMonth()),
        parseInt(date.getDate()),
        parseInt(date.getHours() - 3),
        parseInt(date.getMinutes()),
    );
    CoinServices.postOperation(this.usuario, this.type, this.coin, cantidadCripto, montoPesos, this.dateTime)
        .then(() => this.$router.push({ name: "Situacion" }));
    this.setMovements();
    },
},
};

</script>
