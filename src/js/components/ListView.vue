<template>
    <div class="container list-view">
        <div class="row">
            <div class="col-12">
                <h1 class="my-3">List view</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="form-inline mb-2">
                    <select class="form-control mr-3 mb-3" v-model="genre">
                        <option value="">Please select genre</option>
                        <option v-for="option in genreOptions" :value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                    <input class="form-control mr-3 mb-3" v-model="name" placeholder="Name" />
                    <button class="btn btn-primary mr-3 mb-3" @click="searchMovies()">Search</button>
                    <button class="btn btn-primary mr-3 mb-3" :disabled="!name && !genre" @click="resetFilters()">Reset filters</button>
                </div>
            </div>
        </div>
        <template v-for="movie in movies">
            <div class="row movie mb-5">
                <div class="col-12 col-md-4">
                    <router-link :to="'/movie/' + movie.id" class="d-block mb-3 mb-md-0">
                        <img class="movie__image" :src="movie.image" />
                    </router-link>
                </div>
                <div class="col-12 col-md-8">
                    <div>
                        <router-link :to="'/movie/' + movie.id" class="d-inline-block mb-3 h2">{{ movie.name }}</router-link>
                    </div>
                    <div v-html="movie.description" class="mb-3"></div>
                    <div>
                        <router-link :to="'/movie/' + movie.id" class="btn btn-primary mb-3">Read more</router-link>
                    </div>
                    <sessions :movie-id="movie.id"></sessions>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                movies: [],
                name: '',
                genre: '',
                genreOptions: [
                    { text: 'ACTION', value: '0' },
                    { text: 'ADVENTURES', value: '1' },
                    { text: 'COMEDY', value: '2' },
                    { text: 'DRAMA', value: '3' },
                    { text: 'HORROR', value: '4' },
                    { text: 'WESTERNS', value: '5' }
                ]
            }
        },
        methods: {
            getMovies: function () {
                let self = this;

                axios.get('https://cinema-api-test.y-media.io/v1/movies')
                    .then(response => {
                        let data = response.data;

                        self.movies = data.data;
                        this.$store.commit('updateMovies', data.data);
                    })
                    .catch(e => {
                        alert('Something went wrong: ListView : getMovies');
                    });
            },
            searchMovies: function () {
                let self = this,
                params = '?';
                if (self.name) {
                    params += 'name=' + self.name + '&';
                }

                if (self.genre) {
                    params += 'genres=' + self.genre;
                    console.log('genre', self.genre);
                }

                console.log(params);

                axios.get('https://cinema-api-test.y-media.io/v1/movies' + params)
               //axios.get('https://cinema-api-test.y-media.io/v1/movies?genres=comedy')
                    .then(response => {
                        let data = response.data;

                        self.movies = data.data;
                        this.$store.commit('updateMovies', data.data);
                    })
                    .catch(e => {
                        alert('Something went wrong: ListView : getMovies');
                    });
            },
            resetFilters: function () {
                this.name = '';
                this.genre = '';
            }
        },
        mounted() {

        },
        created() {
            this.getMovies();
        },
        watch: {

        }
    }
</script>
