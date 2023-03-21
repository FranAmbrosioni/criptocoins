<template>
    <div class="tablecontainer">
        <table>
            <thead>
            <tr>
                <th scope="col">Agencia</th>
                <th scope="col">Compra</th>
                <th scope="col">Compra</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="agency in Object.keys(agencies)" :key="agency">
                <td>{{ agency }}</td>
                <td>$ {{this.agencies[agency].totalBid}}</td>
                <td><button @click="change(agency)">Vender</button></td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
export default {
name: 'Agencies',
props: {
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
    selectedCoin: '',
    };
},
methods: {
    change(agency) {
    this.selectedCoin = agency;
    this.$emit('change-view');
    this.$emit('sendCoin', this.selectedCoin);
    },
},
};
</script>

<style scoped>

.tablecontainer{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 100px auto;
}

table{
    background-color: white;
    text-align: center;
    width: 150%;
    border-collapse: collapse;


}
th,td{
    border: solid 1px black;
    padding: 0;
}

thead{
    background-color: #246355;
    border-bottom: solid 5px #0f362d ;
    color: white;

}

tr:nth-child(even){
    background-color: #ddd;

}

tr:hover{
    background-color: #369681;
    color: white;
}

</style>