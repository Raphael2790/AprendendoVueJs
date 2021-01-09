<template>
    <div class="container">
        <loading v-if="loading"/>
        <div v-else>
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
            <total :times="times"/>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import getTimes from '../get-times'
export default {
    //Neste caso o created está sendo utilizado para abastecer o estado do componente
    created() {
        getTimes
            .then(times => this.times = times,
            err => console.log("Aconteceu um erro", err))
            //O bloco finally é executado independente do resultado da promessa
            .finally(() => this.loading = false)
    },
    data() {
        return {
            loading: true,
            busca: '',
            ordem: {
                colunas: ['pontos', 'gm', 'gs', 'saldo'],
                ordenacao : ['desc', 'desc', 'asc', 'desc']
            },
            //times: this.timesColecao
            times: []
        }
    },
    // inject: ['timesColecao'],
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
    beforeUpdate() {
        console.log(Object.assign({},this), "beforeUpdate");
    },
    updated() {
        console.log(Object.assign({}, this), "updated");
    },
    methods: {
        ordenar(indice) {
            // o vue não consegue observar mudanças em profundidade dos objetos e arrays de seus dados
            this.$set(this.ordem.ordenacao, indice, this.ordem.ordenacao[indice]== 'desc'? 'asc': 'desc')
        }
    }
}
</script>