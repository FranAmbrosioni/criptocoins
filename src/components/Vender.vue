<template>
    <div class="">

    <h4 class="centrar">{{selectedCoin.toUpperCase()}}</h4>

    <label class="label">Cantidad de criptomonedas</label><input class="input" type="number" v-model.number="cantidadCripto" @input="calcularPeso"><br>
    <br>
    <label class="label">Monto en pesos</label><input class="input" type="number" v-model.number="montoPesos" @input="calcularCripto"><br>
    <br>
    <div class="centrar">
    <button @click="comprar" class="btnCripto">Vender</button>
    <button @click="volver" class="btnCripto">Volver</button><br>

    </div>
    </div>
    <div v-show="view === 1">
    <p>No posee cantidad suficiente de criptomoneda para realizar la operación</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
    selectedCoin: {
        type: String,
        required: true,
    },
    agencies: {
        type: Object,
        required: true,
    },
    coin: {
        type: String,
        required: true,
    },
    view: {
        type: Number,
        required: true,
    },
    },
    data() {
    return {
        montoPesos: '',
        cantidadCripto: '',
        view: 0,
    };
    },

    computed: {
    ...mapState({
        totalBTC: (state) => state.totalBTC,
        totalETH: (state) => state.totalETH,
        totalXLM: (state) => state.totalXLM,
        totalUSDT: (state) => state.totalUSDT,
    }),
    },
    methods: {
    calcularCripto() {
        this.calcularCripto = (this.montoPesos * 1 / (this.agencies[this.selectedCoin].totalBid));
    },
    calcularPeso() {
        this.montoPesos = (this.cantidadCripto * this.agencies[this.selectedCoin].totalBid);
    },
    comprar() {
        if (this.coin === "btc") {
        if (this.totalBTC >= this.cantidadCripto) {
            this.$emit('registrar', this.cantidadCripto, this.montoPesos);
        } else {
            this.view = 1;
        }
        }
        if (this.coin === 'usdt') {
        if (this.totalUSDT >= this.cantidadCripto) {
            this.$emit('registrar', this.cantidadCripto, this.montoPesos);
        } else {
            this.view = 1;
        }
        }
        if (this.coin === 'xlm') {
        if (this.totalXLM >= this.cantidadCripto) {
            this.$emit('registrar', this.cantidadCripto, this.montoPesos);
        } else {
            this.view = 1;
        }
        }
        if (this.coin === 'eth') {
        if (this.totalETH >= this.cantidadCripto) {
            this.$emit('registrar', this.cantidadCripto, this.montoPesos);
        } else {
            this.view = 1;
        }
        }
    },
    volver() {
        this.$emit('change-view');
    },
    },
};
</script>

<style>

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

.centrar {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
