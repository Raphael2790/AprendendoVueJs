<template>
    <div>
        <img :src="loadGif" alt="Loading Image" width="200px" height="200px">
    </div>
</template>

<script>
import loadGif from '../assets/loading.gif'
export default {
    data() {
        return {
            loadGif
        }
    }
}
</script>