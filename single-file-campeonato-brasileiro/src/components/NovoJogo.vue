<template>
    <div>
        <button class="btn btn-primary" @click="criarNovoJogo" :disabled="loading">Novo Jogo</button>
        <placar-modal-mat :timeCasa="timeCasa" :timeFora="timeFora" ref="modalPlacar" @fim-jogo="mostrarPlacarFinal($event)"></placar-modal-mat>
        <placar-modal-final-mat :timeCasa="timeCasa" :timeFora="timeFora" :placar="placarFinal" ref="modalPlacarFinal"></placar-modal-final-mat>
    </div>
</template>

<script>
import getTimes from '../get-times';
export default {
    created() {
        getTimes.then(times => this.times = times,
        err => console.log("Aconteceu um erro", err))
        .finally(() => this.loading = false);
    },
    data() {
        return {
            //times: this.timesColecao
            loading : true,
            times: [],
            timeCasa: null,
            timeFora: null,
            placarFinal: {}
        }
    },
    //inject - recebe informações ou metodos de elementos pai do mesmo, mas é imutável (não podemos manipular diretamente)
    //Para fazer a manipulação dos dados devemos atribuir os dados a um dado do próprio componente
    methods: {
        criarNovoJogo() {
            let indiceCasa = Math.floor(Math.random() * 20);
            let indiceFora = Math.floor(Math.random() * 20);

            this.timeCasa = this.times[indiceCasa];
            this.timeFora = this.times[indiceFora];
            //$refs - podemos pegar todos os componentes que possuem referencia e usar suas propriedades e métodos
            var modal = this.$refs.modalPlacar;
            modal.mostrarModal();
            //this.$emit('novo-jogo', {visao: 'placar', timeCasa : this.timeCasa, timeFora: this.timeFora});
        },
        mostrarPlacarFinal({golsMarcados, golsSofridos}){
            this.placarFinal = {golsMarcados, golsSofridos};
            var modalPlacar = this.$refs.modalPlacarFinal;
            modalPlacar.mostrarModal();
        }
    }
}
</script>