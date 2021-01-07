<template>
    <div>
        <h3>Times classificados para a Libertadores no momento</h3>
        <ul>
            <li v-for="(time, index) in timesLibertadores" v-bind:key="time+index">
                <!-- time é uma prop do componente clube os fazem o bind da prop com a variavel do for -->
                <clube :time="time"></clube>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['times'],
     computed: {
        timesLibertadores() {
            // do indice x até a posição y 
            return this.times.slice(0,6);
        },
    }
}
</script>