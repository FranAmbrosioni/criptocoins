<template>
    <div>
        <h4>{{selectedCoin.toUpperCase()}}</h4>
        
        <label class="label">Cantidad de CriptoMonedas</label>
        <input  class="input" type="number" v-model.number="cantidadCriptos" @input="calcularPeso">
        <label>Monto en pesos</label>
        <input class="input" type="number" v-model.number="montoPesos" @input="calcularCripto"><br>
        
        <br>
        <button @click="comprar" class="btnCripto">Comprar</button>
        <button @click="volver" class="btnCripto">Volver</button>
    </div>
    
<form>  
    
    
</form>

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

.input,
.label,
.textarea {
  font-family: 'Ubuntu', sans-serif;
  display: block;
  margin: 10px;
  padding: 5px;
  border: none;
  font-size: 22px;
}


</style>