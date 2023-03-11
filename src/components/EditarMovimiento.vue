<template>
    <h3>Editar Movimiento</h3>
<form @submit.prevent="cambiarMovimiento" @reset="volver">
    <select v-model="newValues.crypto_code">
        <option value="btc">Bitcoin</option>
        <option value="eth">Ethereum</option>
        <option value="usdt">Tether</option>
        <option value="ada">Cardano</option>
    </select>

    <select v-model="newValues.action">
        <option value="purchase">Comprar</option>
        <option value="sale">Vender</option>
    </select>

    <label>Monto en Pesos</label>
      <input type="number" v-model.number="newValues.money" step="0.01" @input="calcularCripto">
    <br>
    <label>Cantidad de Criptomonedas</label>
      <input type="number" v-model.number="newValues.crypto_amount" step="0.00001" @input="calcularPeso">
    <br>
    <br>
    <div>
        <input type="submit"  id="boton" value="Aceptar" :disabled="newValues.crypto_amount <=0 || newValues.money <=0">
        <input type="reset" id="boton" value="Cancelar">
    </div>
</form>

</template>

<script>

export default {
data() {
    return {
    newValues: this.information,
    price: this.price,
    };
},
props: {
    information: {
    required: true,

    },
price: {
    required: true,
    },
},
methods: {
    calcularCripto() {
      this.newValues.crypto_amount = (this.newValues.money * 1 / this.price).toFixed(5);
    },
    calcularPeso() {
      this.newValues.money = (this.newValues.money * 1 / this.price).toFixed(2);
    },
    volver() {
    this.$emit('goBack');
    },
    cambiarMovimiento() {
    this.$emit('ChangeOperation', this.newValues);
    },

    },
};

</script>