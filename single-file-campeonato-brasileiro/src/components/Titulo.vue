<template>
    <div class="row">
        <!-- $parent- podemos pegar qualquer propriedade e métodos do elemento pai, podemos também subir níveis usando encadeamento $parent.$parent -->
        <h1>{{$parent.visao | ucWords}} Campeonato Brasileiro 2020 - Série A</h1>
    </div>
</template>

<script>
//Esses são todos os ciclos de vida de um componente dentro do VueJs 2
//Também conhecidos como life-cycle-hooks ou gatilhos de ciclo de vida
export default {
    //beforeCreate não tem acesso as propriedades, métodos e props computadas do componente
    //Grandes utilizações para esse método:
    //- Atribuir propriedades ao próprio componente
    //- Verificar de estado global e local(localstorage, sessionStorage)
    //- Verificar autenticação do usuário
    beforeCreate() {
        //Object assign une 2 objetos, porém se houver chaves duplicadas é mantido o último valor
        console.log(Object.assign({}, this), "beforeCreated");
    },
    //created já tem acesso as propriedades e dados do componente
    created() {
        console.log(Object.assign({}, this), "Created");
    },
    //beforeMount temos acessos aos atributos id, target.Porém não temos acesso as propriedades dos componentes
    //Uma boa utilização seria adiocionar ou remover atributos do componente
    beforeMount() {
        console.log(Object.assign({}, this), "beforeMount");
    },
    mounted() {
        console.log(Object.assign({}, this), "mounted");
    },
    //Usado para executar ações antes de destruir um componente
    beforeDestroy() {
        console.log(Object.assign({}, this), "beforeDestroy");
    },
    //Podemos utilizar para destruir componentes, objetos e também eventos
    destroyed() {
        console.log(this, "destroyed");
    },
}
</script>