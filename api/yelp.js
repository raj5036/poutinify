let express = require('express');
let router = express.Router();
var request = require('request');

// import config file
const config = require('../config');

router.get('/test', function (req, res) {
    res.json({
        message: "Yelp OK"
    })
});

router.get('/places', function (req, res, next) {
    // use the token to access the Yelp API
    var options = {
        url: 'https://api.yelp.com/v3/businesses/search?location=Montreal&term=poutine',
        headers: {
            'Authorization': 'Bearer ' + config.yelp_api_key
        },
        json: true
    };

    request.get(options, function (error, response) {
        const body = response.body;
        // console.log(body);
        // body.businesses = []

        res.json(body.businesses);
        // callback(response.body);
    });
});

router.get('/places/:id', function (req, res, next) {
    // use the token to access the Yelp API
    console.log("fetchings business: ", req.params.id);
    var options = {
        url: `https://api.yelp.com/v3/businesses/${req.params.id}`,
        headers: {
            'Authorization': 'Bearer ' + config.yelp_api_key
        },
        json: true
    };

    request.get(options, function (error, response) {
        const body = response.body;
        res.json(body);
        // callback(response.body);
    });
});


//  GET https://api.yelp.com/v3/businesses/{id}/reviews

router.get('/reviews/:id', function (req, res, next) {
    // use the token to access the Yelp API
    console.log("fetching reviews: ", req.params.id);
    var options = {
        url: `https://api.yelp.com/v3/businesses/${req.params.id}/reviews`,
        headers: {
            'Authorization': 'Bearer ' + config.yelp_api_key
        },
        json: true
    };

    request.get(options, function (error, response) {
        const body = response.body;
        res.json(body.reviews);
        // callback(response.body);
    });
});


// fetch places with an AJAX call using axios
// ---> CORS
// axios.get(
//     'https://api.yelp.com/v3/businesses/search?location=Montreal&term=poutine',
//     {
//         headers: {'Authorization': "Bearer " + config.yelp_api_key},
//         crossDomain: true
//     })
//     .then(res => {
//        const businesses = res.businesses;
//
//        console.log("businesses", businesses);
//     }, err => {
//         console.log("error", err);
//     });


// router.get('/users', function(req, res, next) {
//
//     res.json([{
//         id: 1,
//         username: "samsepi0l"
//     }, {
//         id: 2,
//         username: "D0loresH4ze"
//     }]);
//
//     // res.render('index', { title: 'Express' });
// });

module.exports = router;