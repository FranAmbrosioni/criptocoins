<template>
    <div>
        <h2>Situación Actual</h2>
        <hr>

    </div>
    <div class="centrardiv" v-if="$store.state.movements.length != 0" >
        <div v-if="view ===1">
            <EstadoActual></EstadoActual>
            <Historial @showOperation="seeOperation"></Historial>
            <AnalisisInversion></AnalisisInversion>
        </div>
        <div v-if="view === 2">
            <h3>Información del Movimiento</h3>
            <div class="info">           
                <p>Criptomoneda: {{ information.crypto_code.toUpperCase() }}</p>
                <p>Operación: {{ information.action.toUpperCase() }}</p>
                <p>Cantidad: {{ information.crypto_amount }}</p>
                <p>Dinero Invertido: $ {{ information.money }}</p>
                <p>Fecha de operación: {{ date(information) }}</p>
            </div>
            <br>
            <button @click="view =1">Volver al menú anterior</button>
        </div>
        <div v-else-if="view ===3">
            <EditarMovimiento
                :information="information"
                :price="selectedPrice"
                @goBack="1"
                @changeOperation="change"
            >
            </EditarMovimiento>

        </div>
        <div v-else-if="view ===4">
            <h4>¿Está seguro que desea eliminar este movimiento?</h4>
            <button @click="deleteOperation">Si</button>
            <button @click="view= 1">No</button>
        </div>
        
    </div>
    <div v-else>
            <br>
            Usted no registra movimientos
        </div>
</template>

<script>

import EstadoActual from '@/components/EstadoActual.vue';
import AnalisisInversion from '@/components/AnalisisInversion.vue';
import Historial from '@/components/Historial.vue';
import EditarMovimiento from '@/components/EditarMovimiento.vue';
import CoinServices from '@/services/CoinServices';
import { mapMutations, mapActions } from 'vuex';

export default {
name: 'Situacion',
components: {
    EstadoActual,
    AnalisisInversion,
    Historial,
    EditarMovimiento,
},
data() {
    return {
    view: 1,
    selectedPrice: 0,
    information: {
        _id: "",
        action: "",
        crypto_amount: null,
        crypto_code: "",
        money: null,
        datetime: "",
    },

    }
},
methods: {
    ...mapMutations(['changeShowMainView']),
    ...mapActions(['setMovements']),
    seeOperation(id, page) {
    CoinServices.getMovementsById(id)
        .then((response) => {
        this.information._id = response.data._id;
        this.information.action = response.data.action;
        this.information.crypto_amount = response.data.crypto_amount;
        this.information.crypto_code = response.data.crypto_code;
        this.information.money = response.data.money;
        this.information.datetime = response.data.datetime;
        this.selectedPrice = this.information.money/this.information.crypto_amount;
        })
        .then(()=>this.view = page);
    },
    deleteOperation() {
    CoinServices.deleteOperation(this.information._id)
        .then(()=> this.setMovements())
        .then(()=> this.view = 1);
    },
    change(newValues) {
    CoinServices.changeMovement(newValues);
    this.setMovements();
    this.view = 1;
    },
    date(movement) {
    return (
        movement.datetime.substring(8, 10) +
					"-" +
					movement.datetime.substring(5, 7) +
					"-" +
					movement.datetime.substring(0, 4) +
					" / " +
					movement.datetime.substring(11, 13) +
					":" +
					movement.datetime.substring(14, 16)
    );
    },
},
};

</script>

<style scoped></style>