<template>
    <h4>Total de gols marcados até agora {{totalDeGolsMarcados}}</h4>
</template>

<script>
export default {
    props:['times'],
    //Propriedades dentro de computed vão ser reprocessadas caso algum elemento enterno sofra modificação
    computed: {
        totalDeGolsMarcados() {
            let totalGols = 0;
            this.times.map(time => {
                totalGols += time.gm
            })
            return totalGols;
        }
    }
}
</script>