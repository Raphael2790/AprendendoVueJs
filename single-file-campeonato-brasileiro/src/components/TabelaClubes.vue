<template>
    <div>
        <input type="text" class="form-control" v-model="busca">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th v-for="(coluna, indice) in ordem.colunas" v-bind:key="coluna">
                        <a href="#" @click.prevent="ordenar(indice)">{{coluna | ucWords}}</a>
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- Propriedade class e style tornou reativa, para podermos usar uma função interna -->
                <tr v-for="(time, indice) in timesFiltrados" v-bind:key="time+indice+'x'" :class="{'table-success': indice<6}" :style="{'font-size': indice<6 ? '16px' : '14px', 'background-color': indice>=16 ? '#ff6b5c': ''}">
                    <td>
                    <clube :time="time"></clube>
                    </td>
                    <td>{{time.pontos}}</td>
                    <td>{{time.gm}}</td>
                    <td>{{time.gs}}</td>
                    <!-- <td>{{time | saldo}}</td> -->
                    <td>{{time.saldo}}</td>
                </tr>
            </tbody>
        </table>
        <clubes-libertadores :times="timesOrdenados"></clubes-libertadores>
        <clubes-rebaixados :times="timesOrdenados"></clubes-rebaixados>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    data() {
        return {
            busca: '',
            ordem: {
                colunas: ['pontos', 'gm', 'gs', 'saldo'],
                ordenacao : ['desc', 'desc', 'asc', 'desc']
            },
            times: this.timesColecao
        }
    },
    inject: ['timesColecao'],
    computed: {
        timesFiltrados() {
            var self = this;
            return _.filter(this.timesOrdenados, time => {
                var busca = self.busca.toLowerCase();
                return time.nome.toLowerCase().indexOf(busca) >= 0;
            })
        },
        timesOrdenados() {
            return _.orderBy(this.times, this.ordem.colunas, this.ordem.ordenacao)
        }
    },
    methods: {
        ordenar(indice) {
            // o vue não consegue observar mudanças em profundidade dos objetos e arrays de seus dados 
            this.$set(this.ordem.ordenacao, indice, this.ordem.ordenacao[indice]== 'desc'? 'asc': 'desc')
        }
    }
}
</script>