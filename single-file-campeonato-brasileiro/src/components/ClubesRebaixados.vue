<template>
    <div>
        <h3>Times rebaixados no momento</h3>
        <ul>
            <li v-for="(time, index) in timesRebaixados" v-bind:key="index+time">
                <clube :time="time"></clube>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
     props: ['times'],
     computed: {
        timesRebaixados() {
            return this.times.slice(16, 20);
        },
    }
}
</script>