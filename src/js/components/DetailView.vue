<template>
    <div class="list">
        <h1>Detail view</h1>
        <router-link to="/">Go to list view</router-link>
        <div>
            {{ movie.name }}
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        props: [],
        data() {
            return {
                movie: {}
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
                        alert('Something went wrong: getMovieById');
                    });
            }
        },
        mounted() {

        },
        created() {
            let id = this.$route.params.id;
            this.getMovieById(id);
        },
        watch: {

        }
    }
</script>
