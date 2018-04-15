'use strict';

import { MovieService } from '../../services/movie.service.js';

export class MovieSearchComponent {

    constructor(fieldSearchId) {
        const id = fieldSearchId;
        const movieService = new MovieService();
        const field = $('#' + id);
        const debouncedSearch = _.debounce(phrase => {
            console.log(phrase)
        }, 200);

        movieService.getTrends()
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                field.autocomplete({
                    source: response.results.map(item => item.title),
                    minLength: 0
                });
            });

        field.on('click', () => {
            field.autocomplete('search', '');
        });

        field.on('keyup', (event) => {
            let phrase = event.target.value;
            if (phrase) {
                debouncedSearch(phrase);
            }
        });
    }

}
