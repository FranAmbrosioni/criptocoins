import { createStore } from "vuex";
import CoinServices from "@/services/CoinServices";
import { ssrContextKey } from 'vue';


export default createStore({
  state: {
    user: "",
    showMainView: 0,
    values: [],
    movements: [],
    priceBTC: 0,
    priceUSDT: 0,
    priceETH: 0,
    priceXLM: 0,
    totalBTC: 0,
    totalUSDT: 0,
    totalXLM: 0,
    totalETH: 0,
    resultadoBTC: 0,
    resultadoUSDT: 0,
    resultadoETH: 0,
    resultadoXLM: 0,
  },
  getters: {
    getUser(state){
      return state.user
    },
    getBTCPrice(state){
      return state.priceBTC
    },
    getUSDTPrice(state){
      return state.priceUSDT
    },
    getETHPrice(state){
      return state.priceETH
    },
    getXLMPrice(state){
      return state.priceXLM
    },
    getMovements(state){
      return state.movements
    },
    getCoins(state){
      debugger
      return {
        totalBTC: state.totalBTC,
        totalETH: state.totalETH,
        totalXLM: state.totalXLM,
        totalUSDT: state.totalUSDT,
      }
    }
  },
  mutations: {
    setUser(state, newUser){
      state.user = newUser;
    },
    changeShowMainView(state, view){
      state.showMainView = view;
    },
    getCurrentPriceBTC(state, btc){
      CoinServices.getCurrentPrice(btc)
      .then((response) => {
        state.values = response.data;
        state.priceBTC = parseFloat(state.values.totalBid).toFixed(2);
      })
    },
    getCurrentPriceETH(state, eth){
      CoinServices.getCurrentPrice(eth)
      .then((response) => {
        state.values = response.data;
        state.priceETH = parseFloat(state.values.totalBid).toFixed(2);
      }) 
    },
    getCurrentPriceUSDT(state, usdt){
      CoinServices.getCurrentPrice(usdt)
      .then((response) => {
        state.values = response.data;
        state.priceUSDT = parseFloat(state.values.totalBid).toFixed(2);
      }) 
    },
    getCurrentPriceXLM(state, xlm){
      CoinServices.getCurrentPrice(xlm)
      .then((response) => {
        state.values = response.data;
        state.priceXLM = parseFloat(state.values.totalBid).toFixed(2);
      }) 
    },
    getMovements(state, movements){
      
      state.totalETH = 0;
      state.totalBTC = 0;
      state.totalXLM = 0;
      state.totalUSDT = 0;
      state.resultadoBTC = 0;
      state.resultadoETH = 0;
      state.resultadoXLM = 0;
      state.resultadoUSDT = 0;
      state.movements = movements;
      debugger;
      for (let coin of state.movements){
        if (coin.crypto_code === "btc"){
          if (coin.action === "purchase"){
            state.totalBTC += coin.crypto_amount;
            state.resultadoBTC -= parseFloat(coin.money).toFixed(2);
          } 
          else{
            state.totalBTC -= coin.crypto_amount;
            state.resultadoBTC += parseFloat(coin.money).toFixed(2);
          }
        }
        if (coin.crypto_code === "eth"){
          if (coin.action === "purchase"){
            state.totalETH += coin.crypto_amount;
            state.resultadoETH -= parseFloat(coin.money).toFixed(2);
          } 
          else{
            state.totalETH -= coin.crypto_amount;
            state.resultadoETH += parseFloat(coin.money).toFixed(2);
          }
        }
        if (coin.crypto_code === "usdt"){
          if (coin.action === "purchase"){
            state.totalUSDT += coin.crypto_amount;
            state.resultadoUSDT -= parseFloat(coin.money).toFixed(2);
          } 
          else{
            state.totalUSDT -= coin.crypto_amount;
            state.resultadoUSDT += parseFloat(coin.money).toFixed(2);
          }
        }
        if (coin.crypto_code === "xlm"){
        
          if (coin.action === "purchase"){
            state.totalXLM += coin.crypto_amount;
            state.resultadoXLM -= parseFloat(coin.money).toFixed(2);
          } 
          else{
            state.totalXLM -= coin.crypto_amount;
            state.resultadoXLM += parseFloat(coin.money).toFixed(2);
          }
        }
      }
      debugger;
      state.resultadoETH += state.priceETH * state.totalETH;
      state.resultadoBTC += state.priceBTC * state.totalBTC;
      state.resultadoXLM +=state.priceXLM * state.totalXLM;
      state.resultadoUSDT +=state.priceUSDT * state.totalUSDT;   

      if (state.resultadoETH !== 0){
        state.resultadoETH = parseFloat(state.resultadoETH).toFixed(2)
      }
      
      if (state.resultadoBTC !== 0){

        debugger
        state.resultadoBTC = parseFloat(state.resultadoBTC).toFixed(2)
      }
      if (state.resultadoXLM !== 0){
    
        state.resultadoXLM = parseFloat(state.resultadoXLM).toFixed(2)
      }
      if (state.resultadoUSDT !== 0){
        state.resultadoUSDT = parseFloat(state.resultadoUSDT).toFixed(2)
      }
      
    },
    cleanMovements(state){
      state.movements = [];
    },

  },
  actions: {
    setMovements(resource){
      
      CoinServices.getUserInformation(resource.state.user)
      .then((response) => {
        resource.commit("cleanMovements");

        resource.commit("getMovements", response.data);

        resource.commit("changeShowMainView", 1)
      })
    },
  },
  modules: {
    
  },
});
