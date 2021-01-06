<template>
  <div class="container">
        <titulo></titulo>
        <div class="row">
            <div class="col-md-12">
                <!--$event para pegar o evento passado pela intância Vue da camada inferior -->
                <novo-jogo></novo-jogo>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-12" v-show="visao == 'tabela'">
                <tabela-clubes></tabela-clubes>
                <total-gols/>
            </div>
        </div>
    </div>
</template>

<script>

export default {
   data () {
        return {
        visao: 'tabela',
        timeCasa: null,
        timeFora: null
}
    },
    methods: {
        mostrarTabela(event) {
            this.visao = event
        },
        mostrarPlacar({visao, timeCasa, timeFora}) {
            this.visao = visao;
            this.timeCasa = timeCasa;
            this.timeFora = timeFora;
        }
    },
    filters: {
        saldo(time) {
            return time.gm - time.gs; 
        }
    }
}
</script>
