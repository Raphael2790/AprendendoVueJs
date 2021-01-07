<template>
    <div class="modal">
        <div class="modal-content">
            <slot name="header"></slot>
            <slot></slot>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    mounted() {
        $(this.$el).modal();
    },
    // Destruimos ou modificamos informações do componente
    beforeDestroy() {
        this.mostrarModal().destroy();
        console.log("Destruindo modal...")
    },
    destroyed() {
        //destruir o componente e eventos atrelados a ele
        console.log("Modal destruído");
    },
    methods: {
        //Como estamos bibliotecas de terceiros devemos controlar as ações de seus componentes
        mostrar() {
            this.mostrarModal().open();
            },
        esconder() {
            this.mostrarModal().close();
        },
        mostrarModal() {
            //$el - é uma referencia ao próprio componente
            return window.M.Modal.getInstance(this.$el);
        }
    }
}
</script>