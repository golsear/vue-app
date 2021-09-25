<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <router-link to="/">Go to list view</router-link>
                <h1>{{ movie.name }}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div><img :src="movie.image" /></div>
                <div>{{ movie.description }}</div>
                <div v-html="movie.additional"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <sessions v-if="movie.id" :movie-id="movie.id"></sessions>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        props: [],
        data() {
            return {
                movie: {},
                movieId: null
            }
        },
        methods: {
            getMovieById: function (id) {
                let self = this;

                axios.get('https://cinema-api-test.y-media.io/v1/movies?movie_id=' + id)
                    .then(response => {
                        let data = response.data;

                        self.movie = data.data[0];
                    })
                    .catch(e => {
                        alert('Something went wrong: DetailView : getMovieById');
                    });
            }
         },
        mounted() {
            let id = this.$route.params.id;
            this.getMovieById(id);
        },
        created() {

        },
        watch: {

        }
    }
</script>
