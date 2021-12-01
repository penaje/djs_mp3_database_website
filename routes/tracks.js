//TRACKS .js file

var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

router.get('/', function(req, res)
    {
        let query1 = 'SELECT * FROM tracks';

        let query2 = 'SELECT * FROM artists';

        let query3 = 'SELECT * FROM albums'

        db.pool.query(query1, function(error, rows, fields){

            let track_info=rows;

            db.pool.query(query2, (error, rows, fields) => {

                let artist_info = rows;

                db.pool.query(query3, (error, rows, fields) => {

                    let album_info=rows;
                    
                    //create the maps
                    album_map = {}
                    artist_map = {}

                    //map the album_id to album_title
                    album_info.map(album => {
                        let album_id = parseInt(album.album_id, 10)
    
                        album_map[album_id] = album['album_title'];
                    })


                    //map the artist_id to artist_name
                    artist_info.map(artist => {
                        let artist_id = parseInt(artist.artist_id, 10)
    
                        artist_map[artist_id] = artist['artist_name'];
                    })
    
    
                    //replace the album_id in tracks with the album_title from album_map
                    track_info = track_info.map(track => {
                        return Object.assign(track, {album_id: album_map[track.album_id]})
                    })

                    //replace the artist_id in tracks with the artist_name from artist_map
                    track_info = track_info.map(track => {
                        return Object.assign(track, {artist_id: artist_map[track.artist_id]})
                    })
    

                    let headers_list = ['Track Id', 'Title', 'Artist Name', 'Album Title', 'Individual Price', 'Album Price']

                    return res.render('tracks', {headers:headers_list, data: track_info, artist_info: artist_info, album_info: album_info});
        })
    });
})
});

router.post('/add-tracks-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values for album_id
    let album_id = data['input-album-id'];
    console.log('data test')
    console.log(data['input-album-id'])

    if (album_id === undefined){
        album_id = 'NULL'
    }
    if (album_id === ''){
        album_id = 'NULL'
    }

    // Capture NULL values for artist_id
    let artist_id = data['input-artist-id'];
    console.log('data test')
    console.log(data['input-artist-id'])

    if (artist_id === undefined){
        artist_id = 'NULL'
    }
    if (artist_id === ''){
        artist_id = 'NULL'
    }

    
    // Create the query and run it on the database
    query1 = `INSERT INTO tracks (title, artist_id, album_id, ind_price, album_price) VALUES ('${data['input-title']}', ${artist_id}, ${album_id},'${data['input-ind-price']}', '${data['input-album-price']}')`;
    db.pool.query(query1, function(error, rows, fields){
    
        // Check to see if there was an error
        if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
    
        // If there was no error, we redirect back to our root route, 
        else
        {
            res.redirect('/tracks');
        }
    })
})

module.exports = router;
