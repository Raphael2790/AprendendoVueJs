<template>
    <div>
        <button class="btn btn-primary" @click="criarNovoJogo">Novo Jogo</button>
        <placar-modal :timeCasa="timeCasa" :timeFora="timeFora" ref="modalPlacar"></placar-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            times: this.timesColecao,
            timeCasa: null,
            timeFora: null
        }
    },
    //inject - recebe informações ou metodos de elementos pai do mesmo, mas é imutável (não podemos manipular diretamente)
    //Para fazer a manipulação dos dados devemos atribuir os dados a um dado do próprio componente
    inject: ['timesColecao'],
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
        }
    }
}
</script>