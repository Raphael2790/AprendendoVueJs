<template>
    <modal-mat ref="modalPlacar">
        <h5 slot="header" class="modal-title">Fim de jogo</h5>
        <div>
            <span></span>
            <clube :time="timeCasa" invertido="true" v-if="timeCasa"></clube>
            <span>X</span>
            <clube :time="timeFora" v-if="timeFora"></clube>
            <span></span>
        </div>
        <div slot="footer">
            <button type="button" class="btn btn-secondary" @click.prevent="esconderModal">Fechar</button>
        </div>
    </modal-mat>
</template>

<script>
export default {
    props: ['placar', 'timeCasa', 'timeFora'],
    data() {
        return {
            placarFinal: this.placar
        }
    },
    methods: {
        mostrarModal() {
            //$el - é uma referencia ao próprio componente
            this.pegarModal().mostrar();
        },
        esconderModal() {
            this.pegarModal().esconder();
        },
        pegarModal(){
            return this.$refs.modalPlacar;
        }
    }
}
</script>