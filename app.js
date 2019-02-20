let express = require('express');
let knex = require('knex');

let app = express();

app.get('/api/genres', function (request, response) {
    let connection = knex({
        client: 'sqlite3',
        connection: {
            filename: 'chinook.db'
        }
    });
    connection.select().from('genres').then((genres) => {
        response.json(genres);
    });

    // response.json([1, 2, 3]);
});

//getting a single genre on a genres page
app.get('/api/genres/:id', function (request, response) {
    let id = request.params.id;

    let connection = knex({
        client: 'sqlite3',
        connection: {
            filename: 'chinook.db'
        }
    });
    connection.select().from('genres')
        .where('GenreId', id)
        .first()
        .then((genre) => {
            if (genre) {
                response.json(genre);
            } 
            else {
                response.status(404).json({
                    error: `Genre ${id} not found`
                });
            }

        });

    // response.json([1, 2, 3]);
});

app.listen(process.env.PORT || 1000);