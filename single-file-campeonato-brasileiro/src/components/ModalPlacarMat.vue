<template>
    <modal-mat ref="modal">
        <h5 slot="header" class="modal-title">Novo Jogo</h5>
        <form class="form-inline">
            <input type="text" class="form-control col-md-1" v-model="golsCasa">
            <!-- optional chaining aplicada caso alguma das propridades do objeto não -->
            <clube :time="timeCasa" invertido="true" v-if="timeCasa"></clube>
            <span>X</span>
            <clube :time="timeFora" v-if="timeFora"></clube>
            <input type="text" class="form-control col-md-1" v-model="golsFora">
        </form>
        <div slot="footer">
            <button type="button" class="btn btn-secondary" @click.prevent="esconderModal">Fechar</button>
            <button type="submit" class="btn btn-primary" @click.prevent="fimJogo">Fim de jogo</button>
        </div>
    </modal-mat>
</template>

<script>
export default {
    props: ['timeCasa', 'timeFora'],
    data() {
        return {
            golsCasa: 0,
            golsFora: 0
        }
    },
    methods: {
        fimJogo() {
            let golsMarcados = parseInt(this.golsCasa);
            let golsSofridos = parseInt(this.golsFora);

            //Podemos referencia uma propriedade do elemento usando a palavra this
            //Podemos também referenciar seus próprios objetos com this
            this.timeCasa.fimJogo(this.timeFora, golsMarcados, golsSofridos);
            this.$emit('fim-jogo',{golsMarcados,golsSofridos});
            //this.$emit('fim-jogo', console.log("Acabou o jogo!"))
            this.esconderModal();
        },
        mostrarModal() {
            //$el - é uma referencia ao próprio componente
            this.pegarModal().mostrar();
        },
        esconderModal() {
            this.pegarModal().esconder();
        },
        pegarModal(){
            return this.$refs.modal;
        }
    }
}
</script>