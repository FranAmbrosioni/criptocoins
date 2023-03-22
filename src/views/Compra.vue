<template>
    <div>
        <h2 class="centrardiv">Compra</h2>
        <hr>
    </div>

    <h3 class="centrardiv">Selecciona la Moneda a Comprar</h3>

    <div class="centrardiv">
        <div v-if="view ===1">
            
            <button class="btnCripto" @click="Cripto(btc)"><span class="text">Bitcoin</span></button>
            <button class="btnCripto" @click="Cripto(usdt)"><span class="text">Tether</span></button>
            <button class="btnCripto" @click="Cripto(ada)"><span class="text">Cardano</span></button>
            <button class="btnCripto" @click="Cripto(eth)"><span class="text">Ethereum</span></button>
        
            
        <div class="centrardiv" v-show="seeTable">
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

<style> 

.centrardiv {
    display: flex;
    align-items: center;
    justify-content: center;
}


.btnCripto {
background-color: #222;
  border-radius: 4px;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: "Farfetch Basis","Helvetica Neue",Arial,sans-serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
  margin: 10px;
  max-width: none;
  min-height: 30px;
  min-width: 5px;
  outline: none;
  overflow: hidden;
  padding: 10px 20px 10px 10px;
  position: relative;
  text-align: center;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100px;
}

.btnCripto:hover,
.btnCripto:focus {
    opacity: .75;
    background-color: rgb(3, 63, 45);
    color: #222;
}
</style>