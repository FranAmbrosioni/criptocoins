<template>
        <h1 id="tituloheader">GoldenCoin</h1>
        
    <div id="contenedor">
            <div id="central">
                <div id="login">
                    <div class="titulo">
                        Bienvenido 
                    </div>
                    <form id="loginform">
                        <input type="text" name="usuario" placeholder="Usuario" required v-model="usuario">
                        
                    <!--  <input type="password" placeholder="Contraseña" name="password" required>-->
                        
                        <button type="submit" title="Ingresar" name="Ingresar" @click="entrar">Ingresar</button>
                    </form>
                    <p>{{error}}</p>
                    <Compra :usuario="usuario"></Compra>
                </div>
                
            </div>
        </div>

</template>

<style>

body {
    font-family: 'Overpass', sans-serif;
    font-weight: normal;
    font-size: 100%;
    color: #1b262c;
    
    margin: 0;
    background-color: #238dd3;
}

#tituloheader {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 70px;
    font-weight: 600;
    background-image: linear-gradient(to left, #032e52, #6a0e72);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
}
#contenedor {
    display: flex;
    align-items: center;
    justify-content: center;    
    margin: 0;
    padding: 0;
    min-width: 100vw;
    min-height: 100vh;
    width: 100%;
    height: 100%;
}

#central {
    max-width: 320px;
    width: 100%;
}

.titulo {
    font-size: 250%;
    color:#bbe1fa;
    text-align: center;
    margin-bottom: 20px;
}

#login {
    width: 100%;
    padding: 50px 30px;
    background-color: #3282b8;
    
    -webkit-box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.15);
    -moz-box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.15);
    box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.15);
    
    border-radius: 3px 3px 3px 3px;
    -moz-border-radius: 3px 3px 3px 3px;
    -webkit-border-radius: 3px 3px 3px 3px;
    
    box-sizing: border-box;
}

#login input {
    font-family: 'Overpass', sans-serif;
    font-size: 110%;
    color: #1b262c;
    
    display: block;
    width: 100%;
    height: 40px;
    
    margin-bottom: 10px;
    padding: 5px 5px 5px 10px;
    
    box-sizing: border-box;
    
    border: none;
    border-radius: 3px 3px 3px 3px;
    -moz-border-radius: 3px 3px 3px 3px;
    -webkit-border-radius: 3px 3px 3px 3px;
}

#login input::placeholder {
    font-family: 'Overpass', sans-serif;
    color: #E4E4E4;
}

#login button {
    font-family: 'Overpass', sans-serif;
    font-size: 110%;
    color:#1b262c;
    width: 100%;
    height: 40px;
    border: none;
    
    border-radius: 3px 3px 3px 3px;
    -moz-border-radius: 3px 3px 3px 3px;
    -webkit-border-radius: 3px 3px 3px 3px;
    
    background-color: #bbe1fa;
    
    margin-top: 10px;
}

#login button:hover {
    background-color: #0f4c75;
    color:#bbe1fa;
}

.pie-form {
    font-size: 90%;
    text-align: center;    
    margin-top: 15px;
}

.pie-form a {
    display: block;
    text-decoration: none;
    color: #bbe1fa;
    margin-bottom: 3px;
}

.pie-form a:hover {
    color: #0f4c75;
}

.inferior {
    margin-top: 10px;
    font-size: 90%;
    text-align: center;
}

.inferior a {
    display: block;
    text-decoration: none;
    color: #bbe1fa;
    margin-bottom: 3px;
}

.inferior a:hover {
    color: #3282b8;
}


</style>

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
