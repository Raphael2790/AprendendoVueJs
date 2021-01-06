<template>
    <div class="row">
        <!-- $parent- podemos pegar qualquer propriedade e métodos do elemento pai, podemos também subir níveis usando encadeamento $parent.$parent -->
        <h1>{{$parent.visao | ucWords}} Campeonato Brasileiro 2020 - Série A</h1>
    </div>
</template>