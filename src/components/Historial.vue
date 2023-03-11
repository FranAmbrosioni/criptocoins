<template>
    <div>
        <h3>Historial</h3>
        <table>
            <thead>
                <tr>
                    <th>Moneda</th>
                    <th>Operación</th>
                    <th>Cantidad</th>
                    <th>Dinero Invertido</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
        </table>
        <tbody>

        </tbody>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
data() {
    return {
    movements: [],
    };
},
computed:
    mapState({ usuario: (state) => state.user }),
...mapGetters(['getBTCPrice', 'getETHPrice', 'getUSDTPrice', 'getADAPrice']),

methods: {
    ...mapMutations(['getCurrentPriceBTC', 'getCurrentPriceETH', 'getCurrentPriceUSDT', 'getCurrentPriceADA']),

    operation(id, view) {
    this.$emit('showOperation', id, view);
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
