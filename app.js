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
            } else {
                response.status(404).json({
                    error: `Genre ${id} not found`
                });
            }

        });
});
//Return Artists
app.get('/api/artists', function (request, response) {
    let connection = knex({
        client: 'sqlite3',
        connection: {
            filename: 'chinook.db'
        }
    });
    connection.select().from('artists').then((artists) => {
        // var artists = response.json(artists);
        var reformattedArtists = artists.map(obj => {
            var newObj = {};
            newObj['id'] = obj.ArtistId;
            newObj['name'] = obj.Name;
            return newObj;


        });
        response.json(reformattedArtists);
    });

});

app.get('/api/artists?filter=a', function (request, response) {

            let filter = (request.query.filter);

            let connection = knex({
                client: 'sqlite3',
                connection: {
                    filename: 'chinook.db'
                }
            });
            var query = '';
            
            if (filter) {
            connection.select().from('artists')
                .where('Name', 'like', `%${filter}%`)

                .then((artists) => {
                        // var artists = response.json(artists);
                            connection.select()
                              if (artist) {
                                response.json(artist);
                              } else {
                                response.status(404).json({
                                  error: 'The artist ${filter} could not be found'
                                });
                              };
                  
                  
                            });
                        } else {

                            connection.select().from('artists').then((artists) => {
                                var reformattedArtists = artists.map(obj => {
                                    var newObj = {};
                                    newObj['id'] = obj.ArtistId;
                                    newObj['name'] = obj.Name;
                                    return newObj;
                        
                        
                                });
                                response.json(reformattedArtists);
                          
                    
                        }); 
                    }
                });

        app.listen(process.env.PORT || 1000);
        