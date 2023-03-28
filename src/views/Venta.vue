<template>
    <div>
        <h2 class="centrardiv">Venta</h2>
        <hr>
    </div>

    <h3 class="centrardiv">Seleccione una criptomoneda</h3>

    <div class="centrardiv">
        <div v-if="view=== 1">
        <button class="btnCripto" @click="Cripto(btc)">Bitcoin</button>
        <button class="btnCripto" @click="Cripto(usdt)">Tether</button>
        <button class="btnCripto" @click="Cripto(ada)">Cardano</button>
        <button class="btnCripto" @click="Cripto(eth)">Ethereum</button>
        <div v-show="seeTable">
            <TablaVenta :agencies="agencies" :view="view" @change-view="changeView" @sendCoin="selectAgency"></TablaVenta>
        </div>
        </div>
        <div v-else-if="view === 2">
            <Vender :selectedCoin="selectedCoin" :view="view" @change-view="changeView" :coin="coin" :agencies="agencies" @registrar="registrar"></Vender>
        </div>
    </div>
</template>

<script>

import CoinServices from '@/services/CoinServices';
import TablaVenta from '@/components/TablaVenta.vue';
import Vender from '@/components/Vender.vue';
import  Login from '@/components/LogIn.vue';
import { mapState, mapActions } from 'vuex';

export default {
name: 'Venta',
components: {
    TablaVenta,
    Vender,
    Login

},
data() {
    return {
    agencies: [],
    coin: '',
    view: 1,
    selectedCoin: "",
    dateTime: "",
    type: 'sale',
    btc: 'btc',
    eth: 'eth',
    usdt: 'usdt',
    ada: 'ada',
    seeTable: false,
    };
},
computed:
        mapState({ usuario: (state) => state.user }),
methods: {
    ...mapActions(['setMovements']),
    Cripto(value) {
      this.coin = value;
      CoinServices.getCoins(this.coin)
        .then((response) => {
          this.agencies = response.data;})
        .then(() => this.changeSeeTable());
    },
    changeView() {
      if (this.view === 1) {
        this.view = 2;
      } else {
        this.view = 1;
      }
    },
    changeSeeTable() {
      this.seeTable = true;
    },
    selectAgency(selected) {
      this.selectedCoin = selected;
    },
    registrar(cantidadCripto, MontoPesos) {
      let date = new Date();
      this.dateTime = new Date(
        parseInt(date.getFullYear()),
        parseInt(date.getMonth()),
        parseInt(date.getDate()),
        parseInt(date.getHours() - 3),
        parseInt(date.getMinutes()),
      );
      CoinServices.postOperation(this.usuario, this.type, this.coin, cantidadCripto, MontoPesos, this.dateTime)
        .then(() => this.$router.push({ name: "Situacion" }));
      this.setMovements();
    },
  },
};
</script>

<style >
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
    opacity: .95;
    background-color: rgb(3, 63, 45);
    color: #fffefe;
}

</style>