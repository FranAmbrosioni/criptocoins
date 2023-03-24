<template>
    <div>
        <h4>{{selectedCoin.toUpperCase()}}</h4>
        <label>Monto en pesos</label>
        <input type="number" v-model.number="montoPesos" @input="calcularCripto"><br>
        <label>Cantidad de CriptoMonedas</label>
        <input type="number" v-model.number="cantidadCriptos" @input="calcularPeso"><br>
        <br>
        <button @click="comprar">Comprar</button>
        <button @click="volver">Volver</button>
    </div>
    
    </template>
    
    <script>
    
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
        view: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
        montoPesos: '',
        cantidadCriptos: '',
        }
    },
    methods: {
        calcularCripto() {
          this.cantidadCriptos = (this.montoPesos * 1 / (this.agencies[this.selectedCoin].totalAsk));
        },
        calcularPeso() {
          this.montoPesos = (this.cantidadCriptos * this.agencies[this.selectedCoin].totalAsk);
        },
        comprar() {
            debugger;
        this.$emit('registrar', this.cantidadCriptos, this.montoPesos);
        },
        volver() {
        this.$emit('change-view');
        },
    },
    
    }
    
    </script>
    
    <style>
    </style>