<template>
    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <slot name="header"></slot>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <slot></slot>
        </div>
        <div class="modal-footer">
            <slot name="footer"></slot>
        </div>
        </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    methods: {
        //Como estamos bibliotecas de terceiros devemos controlar as ações de seus componentes
        mostrar() {
            //$el - é uma referencia ao próprio componente
            $(this.$el).modal('show');
        },
        esconder() {
            $(this.$el).modal('hide');
        }
    }
}
</script>