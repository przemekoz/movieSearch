'use strict';

import { MovieService } from '../../services/movie.service.js';

export class MovieSearchComponent {

    constructor(fieldSearchId) {
        const id = fieldSearchId;
        const movieService = new MovieService();
        const field = $('#' + id);
        let notSearchInit = true;

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
            if (phrase && notSearchInit) {
                notSearchInit = false;
                field.autocomplete('option', 'source', (request, response) => {
                    $.getJSON(movieService.getSuggestionsSource() + request.term, {}, response);
                })
                field.autocomplete('instance')._renderMenu = function (ul, items) {
                    let that = this;
                    items.forEach(item => {
                        _.forEach(item, innerItem => {
                            if (innerItem) {
                                that._renderItemData(ul, innerItem);
                            }
                        });
                    });
                };

                field.autocomplete('instance')._renderItem = (ul, item) => {
                    console.log(item)
                    return $('<li>')
                        .append('<div>' + item.title + '<br>' + item.release_date + '</div>')
                        .appendTo(ul);
                };
                field.autocomplete('option', 'delay', 200);
            }
        });
    }

}
