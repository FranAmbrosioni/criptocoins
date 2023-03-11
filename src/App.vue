
<template>
  <div class="">
    <div v-if="showMainView === 1">
    <div id="">
      <router-link to="/">Situación Actual</router-link> |
      <router-link to="/Compra">Comprar</router-link> |
      <router-link to="/Venta">Vender</router-link>

      <br>

      <h1>CriptoMarket</h1>
      <p id="">Usuario: {{$store.state.user}}</p>

      <button id="inicioButton" @click="changeUser">Cambiar</button>

    </div>
      <router-view/>
    </div>

    <div v-if="showMainView === 0">
    <LogIn @user-log-in="userName" ></LogIn>
    </div>
  </div>
  <div class="loadingPage" v-if="showMainView === 2">
      <h4 id="loadingText">
        Por favor, aguarde un instante. <br>
        Estamos Procesando su consulta.
      </h4>
      <img id="imgCargando" src="https://c.tenor.com/XK37GfbV0g8AAAAC/loading-cargando.gif"/>      
    </div>
  
</template>
<script>

import LogIn from '@/components/LogIn.vue';
import { mapState, mapMutations, mapActions } from 'vuex';

export default{
  components: {
    LogIn,
  },
  data() {
    return {
      usuario: '',
      btc: 'btc',
      eth: 'eth',
      ada: 'ada',
      usdt: 'usdt',
    };
  },
  computed:{
  ...mapState({
      showMainView: (state) => state.showMainView    
    }),
  },
  methods: {
    ...mapMutations(['cleanMovements', 'setUser', 'changeShowMainView',
          'getCurrentPriceBTC', 'getCurrentPriceUSDT', 'getCurrentPriceADA', 'getCurrentPriceETH']),
    ...mapActions(['setMovements']),

    changeUser() {
      this.cleanMovements();
      this.changeShowMainView(0);
    },
    userName(user) {
      this.setUser(user);
      this.setMovements();
      this.getCurrentPriceBTC(this.btc);
      this.getCurrentPriceADA(this.ada);
      this.getCurrentPriceUSDT(this.usdt);
      this.getCurrentPriceETH(this.eth);
      this.changeShowMainView(2);
    },
  },
}
</script>

<style>

</style>
