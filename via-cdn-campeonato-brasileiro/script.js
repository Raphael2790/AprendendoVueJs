// Filtro global que pode ser visto por todos componentes
Vue.filter('ucWords', (valor) => {
    return valor.charAt(0).toUpperCase() + valor.slice(1)
})

Vue.component("my-app", {
    template: 
    `
    <div class="container">
        <titulo></titulo>
        <div class="row">
            <div class="col-md-12">
                <!- $event para pegar o evento passado pela intância Vue da camada inferior ->
                <novo-jogo></novo-jogo>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-12" v-show="visao == 'tabela'">
                <tabela-clubes></tabela-clubes>
                <total-gols/>
            </div>
        </div>
    </div>
    `,
    data () {
        return {
        visao: 'tabela',
        timeCasa: null,
        timeFora: null
}
    },
    methods: {
        mostrarTabela(event) {
            this.visao = event
        },
        mostrarPlacar({visao, timeCasa, timeFora}) {
            this.visao = visao;
            this.timeCasa = timeCasa;
            this.timeFora = timeFora;
        }
    },
    filters: {
        saldo(time) {
            return time.gm - time.gs; 
        }
    }
});

Vue.component('total-gols', {
    template: `
    <h4>Total de gols marcados até agora {{totalDeGolsMarcados}}</h4>
    `,
    inject: ['timesColecao'],
    //Propriedades dentro de computed vão ser reprocessadas caso algum elemento enterno sofra modificação
    computed: {
        totalDeGolsMarcados() {
            let totalGols = 0;
            this.timesColecao.map(time => {
                totalGols += time.gm
            })
            return totalGols;
        }
    }
})

Vue.component('times-libertadores', {
    props: ['times'],
    template: `
    <div>
        <h3>Times classificados para a Libertadores no momento</h3>
        <ul>
            <li v-for="time in timesLibertadores">
                <!-- time é uma prop do componente clube os fazem o bind da prop com a variavel do for -->
                <clube :time="time"></clube>
            </li>
        </ul>
    </div>
    `,
    computed: {
        timesLibertadores() {
            // do indice x até a posição y 
            return this.times.slice(0,6);
        },
    }
});

Vue.component('tabela-clubes', {
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
    template: `
    <div>
        <input type="text" class="form-control" v-model="busca">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th v-for="(coluna, indice) in ordem.colunas">
                        <a href="#" @click.prevent="ordenar(indice)">{{coluna | ucWords}}</a>
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- Propriedade class e style tornou reativa, para podermos usar uma função interna -->
                <tr v-for="(time, indice) in timesFiltrados" :class="{'table-success': indice<6}" :style="{'font-size': indice<6 ? '16px' : '14px', 'background-color': indice>=16 ? '#ff6b5c': ''}">
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
        <times-libertadores :times="timesOrdenados"></times-libertadores>
        <times-rebaixados :times="timesOrdenados"></times-rebaixados>
    </div>
    `,
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
})

Vue.component('times-rebaixados', {
    props: ['times'],
    template: `
    <div>
        <h3>Times rebaixados no momento</h3>
        <ul>
            <li v-for="time in timesRebaixados">
                <clube :time="time"></clube>
            </li>
        </ul>
    </div>
    `,
    computed: {
        timesRebaixados() {
            return this.times.slice(16, 20);
        },
    }
});

Vue.component('titulo', {
    template: `
    <div class="row">
        <!- $parent- podemos pegar qualquer propriedade e métodos do elemento pai, podemos também subir níveis usando encadeamento $parent.$parent  ->
        <h1>{{$parent.visao | ucWords}} Campeonato Brasileiro 2020 - Série A</h1>
    </div>
    `
});

Vue.component('clube', {
    props: ['time', 'invertido'],
    template: `
    <div style="display: flex; flex-direction: row">
    <img :src="time.escudo" :alt="time.nome" class="escudo" :style="{'order': invertido == 'true'? 2: 1}">
    <span :style="{'order': invertido == 'true' ? 1 : 2}">{{time.nome | ucWords}}</span>
    </div>
    `
});

Vue.component('placar', {
    props: ['timeCasa', 'timeFora'],
    data() {
        return {
            golsCasa: 0,
            golsFora: 0
        }
    },
    template: `
    <form class="form-inline">
        <input type="text" class="form-control col-md-1" v-model="golsCasa">
        <!-- optional chaining aplicada caso alguma das propridades do objeto não -->
        <clube :time="timeCasa" invertido="true" v-if="timeCasa"></clube>
        <span>X</span>
        <clube :time="timeFora" v-if="timeFora"></clube>
        <input type="text" class="form-control col-md-1" v-model="golsFora">
        <button type="submit" class="btn btn-primary" @click.prevent="fimJogo">Fim de jogo</button>
    </form>
    `,
    methods: {
        fimJogo() {
            let golsMarcados = parseInt(this.golsCasa);
            let golsSofridos = parseInt(this.golsFora);

            //Podemos referencia uma propriedade do elemento usando a palavra this
            //Podemos também referenciar seus próprios objetos com this
            this.timeCasa.fimJogo(this.timeFora, golsMarcados, golsSofridos);
            this.$emit('fim-jogo', 'tabela')
        }
    }
});

Vue.component("novo-jogo", {
    template: 
    `
    <div>
        <button class="btn btn-primary" @click="criarNovoJogo">Novo Jogo</button>
        <modal-placar :timeCasa="timeCasa" :timeFora="timeFora" ref="modalPlacar"></modal-placar>
    </div>
    `,
    data() {
        return {
            times: this.timesColecao,
            timeCasa: null,
            timeFora: null
        }
    },
    //inject - recebe informações ou metodos de elementos pai do mesmo, mas é imutável (não podemos manipular diretamente)
    //Para fazer a manipulação dos dados devemos atribuir os dados a um dado do próprio componente
    inject: ['timesColecao'],
    methods: {
        criarNovoJogo() {
            let indiceCasa = Math.floor(Math.random() * 20);
            let indiceFora = Math.floor(Math.random() * 20);

            this.timeCasa = this.times[indiceCasa];
            this.timeFora = this.times[indiceFora];
            //$refs - podemos pegar todos os componentes que possuem referencia e usar suas propriedades e métodos
            var modal = this.$refs.modalPlacar;
            modal.mostrarModal();
            //this.$emit('novo-jogo', {visao: 'placar', timeCasa : this.timeCasa, timeFora: this.timeFora});
        }
    }
});

Vue.component("modal-placar", {
    props: ['timeCasa', 'timeFora'],
    template:
    `
    <modal ref="modal">
        <h5 slot="header" class="modal-title">Novo Jogo</h5>
        <form class="form-inline">
            <input type="text" class="form-control col-md-1" v-model="golsCasa">
            <!-- optional chaining aplicada caso alguma das propridades do objeto não -->
            <clube :time="timeCasa" invertido="true" v-if="timeCasa"></clube>
            <span>X</span>
            <clube :time="timeFora" v-if="timeFora"></clube>
            <input type="text" class="form-control col-md-1" v-model="golsFora">
        </form>
        <div slot="footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" @click.prevent="fimJogo">Fim de jogo</button>
        </div>
    </modal>
    `,
    data() {
        return {
            golsCasa: 0,
            golsFora: 0
        }
    },
    methods: {
        fimJogo() {
            let golsMarcados = parseInt(this.golsCasa);
            let golsSofridos = parseInt(this.golsFora);

            //Podemos referencia uma propriedade do elemento usando a palavra this
            //Podemos também referenciar seus próprios objetos com this
            this.timeCasa.fimJogo(this.timeFora, golsMarcados, golsSofridos);
            this.esconderModal();
        },
        mostrarModal() {
            //$el - é uma referencia ao próprio componente
            this.pegarModal().mostrar();
        },
        esconderModal() {
            this.pegarModal().esconder();
        },
        pegarModal(){
            return this.$refs.modal;
        }
    }
})

Vue.component('modal', {
    //Podemos criar slots para encaixe de conteudo e devemos nomea-los para poder usar mais de um
    //Porém tags slots não podem receber atributos
    template: `
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
    `,
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
})

new Vue({
    el: "#app",
    template: '<my-app></my-app>',
    //provide - torna possível a utlização de informações por componentes filhos
    provide() {
        return {
            timesColecao: [
            new Time('palmeiras', 'assets/palmeiras_60x60.png'),
            new Time('Internacional', 'assets/internacional_60x60.png'),
            new Time('Flamengo', 'assets/flamengo_60x60.png'),
            new Time('Atlético-MG', 'assets/atletico_mg_60x60.png'),
            new Time('Santos', 'assets/santos_60x60.png'),
            new Time('Botafogo', 'assets/botafogo_60x60.png'),
            new Time('Atlético-PR', 'assets/atletico-pr_60x60.png'),
            new Time('Corinthians', 'assets/corinthians_60x60.png'),
            new Time('Grêmio', 'assets/gremio_60x60.png'),
            new Time('Fluminense', 'assets/fluminense_60x60.png'),
            new Time('Bahia', 'assets/bahia_60x60.png'),
            new Time('Chapecoense', 'assets/chapecoense_60x60.png'),
            new Time('São Paulo', 'assets/sao_paulo_60x60.png'),
            new Time('Cruzeiro', 'assets/cruzeiro_60x60.png'),
            new Time('Sport', 'assets/sport_60x60.png'),
            new Time('Ceará', 'assets/ceara_60x60.png'),
            new Time('Vitória', 'assets/vitoria_60x60.png'),
            new Time('Vasco', 'assets/vasco_60x60.png'),
            new Time('América-MG', 'assets/america_mg_60x60.png'),
            new Time('Paraná', 'assets/parana_60x60.png'),
            ]
        }
    },
    data: {
        // times: [
        //     new Time('palmeiras', 'assets/palmeiras_60x60.png'),
        //     new Time('Internacional', 'assets/internacional_60x60.png'),
        //     new Time('Flamengo', 'assets/flamengo_60x60.png'),
        //     new Time('Atlético-MG', 'assets/atletico_mg_60x60.png'),
        //     new Time('Santos', 'assets/santos_60x60.png'),
        //     new Time('Botafogo', 'assets/botafogo_60x60.png'),
        //     new Time('Atlético-PR', 'assets/atletico-pr_60x60.png'),
        //     new Time('Corinthians', 'assets/corinthians_60x60.png'),
        //     new Time('Grêmio', 'assets/gremio_60x60.png'),
        //     new Time('Fluminense', 'assets/fluminense_60x60.png'),
        //     new Time('Bahia', 'assets/bahia_60x60.png'),
        //     new Time('Chapecoense', 'assets/chapecoense_60x60.png'),
        //     new Time('São Paulo', 'assets/sao_paulo_60x60.png'),
        //     new Time('Cruzeiro', 'assets/cruzeiro_60x60.png'),
        //     new Time('Sport', 'assets/sport_60x60.png'),
        //     new Time('Ceará', 'assets/ceara_60x60.png'),
        //     new Time('Vitória', 'assets/vitoria_60x60.png'),
        //     new Time('Vasco', 'assets/vasco_60x60.png'),
        //     new Time('América-MG', 'assets/america_mg_60x60.png'),
        //     new Time('Paraná', 'assets/parana_60x60.png'),
        // ]
    }
    // Usando $root podemos acessar valores diretos da intância principal VusJS
    // Problemas de usar $root e $parent é gerar acoplamento entre componentes
})