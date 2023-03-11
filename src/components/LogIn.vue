<template>

    <div>
        <h1>Bienvenido a GoldenCoin</h1>
        <input type="text" placeholder="Ingrese su usuario" v-model="usuario"><br>
        <br>
        <button @click="entrar">Ingresar</button>
        <p>{{error}}</p>
        <Compra :usuario="usuario"></Compra>
    </div>

</template>

<script>
export default {
    data() {
        return {
            usuario: "",
            error: "",
        }
},
props: {
    showMain: {
    type: Number,
    required: true,
    }
},
methods: {
    entrar() {
        
    if ((this.usuario).trim() !== "") 
    {
        debugger;
        this.$emit('ingresar');
        this.$emit('user-log-in', this.usuario);
        
    } 
    else{
        this.error = 'Debe Ingresar un Usuario Valido';
    }
    }
}
};

</script>
