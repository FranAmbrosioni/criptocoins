
<template>
  <div class="">
    
    <div v-if="showMainView === 1">
      
      <div class="usuaContainer"> 
      <p class="usuaName">Usuario: {{$store.state.user}}</p>
      <button id="btnCambiar" @click="changeUser">Cambiar</button>
      </div>  
      <h1 class="title">CriptoMarket</h1>                     
      <br>
      <div class="centrardiv">    
      <br>
      <router-link class="btnLink" to="/">Situación Actual</router-link> 
      <router-link class="btnLink" to="/Compra">Comprar</router-link> 
      <router-link class="btnLink" to="/Venta">Vender</router-link>    
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

.title{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size: 48px; color: #09440b;
}
.centrar{
  display: flex;
  align-items: center;
  justify-content: right;
}

.usuaContainer{
  display: flex;
  float: right;
  justify-content: center;
}

.usuaName{
  color: #ffffff;
  font-family: system-ui, sans-serif;
  font-weight:bold;
  font-size: 1rem;
}

#btnCambiar {
  background-color: #222;
  border-radius: 4px;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: "Farfetch Basis","Helvetica Neue",Arial,sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  margin: 5px;
  max-width: none;
  min-height: 30px;
  min-width: 5px;
  outline: none;
  overflow: hidden;
  padding: 5px 5px 5px 5px;
  position: relative;
  text-align: center;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 90px;
}


#btnCambiar:focus,
#btnCambiar:hover{
  opacity: .75;
    background-color: rgb(233, 8, 46);
    color: #ffffff;
}

.btnLink{
  --c: #fff; /* text color */
  
  background: 
    linear-gradient(90deg, #0000 33%, #fff5, #0000 67%) var(--_p,100%)/300% no-repeat,
    #01472a; /* background color */
  color: #0000;
  border: none;
  transform: perspective(500px) rotateY(calc(20deg*var(--_i,-1)));
  text-shadow: 
    calc(var(--_i,-1)* 0.08em) -.01em 0   var(--c),
    calc(var(--_i,-1)*-0.08em)  .01em 2px #0004;
  outline-offset: .1em;
  transition: 0.3s;
  font-family: system-ui, sans-serif;
  font-weight:bold;
  font-size: 1.5rem;
  margin: 5px;
  cursor: pointer;
  padding: 10px 10px;
}

.btnLink:hover,
.btnLink:focus-visible{
  --_p: 0%;
  --_i: 1;
}

.btnLink:active{
  text-shadow: none;
  color: var(--c);
  box-shadow: inset 0 0 9e9q #0005;
  transition: 0s;
}
</style>
