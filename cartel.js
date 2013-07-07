/*****************************
 * sforce API V1.0
 * @author Alejandro Tardín
 *****************************/
var express   = require('express');
var app       = express();
var rest      = new (require('node-rest-client').Client);
var request   = require('request');

/*****************************
 * Public files
 *****************************/
app.use('/', express.static(__dirname + '/public'));

/*****************************
 * API definition
 *****************************/

/* Middlewares */
app.use('/api', express.logger());
app.use('/api', express.bodyParser());
app.use('/api', express.cookieParser());
app.use('/api', express.session({ key: 'clonio.session', secret: '' + Math.random() }));

/* CORS Headers to enable cross domain */
app.all('/api/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

/*****************************
 * Resources
 *****************************/

// AUTH
function authorize(req, res, next) {
    if (req.session.oauth) {
        next();
    } else {
        request.post({
            url: 'https://login.salesforce.com/services/oauth2/token',
            json:true,
            form: {
                grant_type   : 'password',
                client_id    : '3MVG9A2kN3Bn17hv0GskO1wE_q6L8Qkw7iVZlkFazisQxNNcugdS3YV64PlilEyPpwH7p2SscIwra9G8u.hJM',
                client_secret: '1634297907960023626',
                username     : 'alejandro@tardin.com',
                password     : 'salesforce0TcUUXqxl1jhOixBldWnMBHZv8'
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                req.session.oauth = body;
                next();
            } else {
                res.send(error, response.statusCode);
            }
        });
    }
};

// GET
app.get('/api/*', authorize, function(req, res) {
    rest.get(req.session.oauth.instance_url + (req.get('salesforceurl') || req.params[0]), {
        headers:{
            "Authorization": 'Bearer ' + req.session.oauth.access_token
        }
    }, function(data, response) {
        for(var item in response.headers) {
    console.log(item + ": " + response.headers[item]);
  }
        res.send(data, response.statusCode);
    });
});

// POST
app.post('/api/*', authorize, function(req, res) {
     request.post({
        url: req.session.oauth.instance_url + (req.get('salesforceurl') || req.params[0]),
        json:true,
        body: req.body,
        headers:{
            "Authorization": 'Bearer ' + req.session.oauth.access_token
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body);
        } else {
            res.send(error, response.statusCode);
        }
    });
});

// NON API Not found route
app.all('*', function(req, res) {
    res.send(':S', 404);
});

// Global error function
app.use(function(err, req, res, next) {
    console.log(err);
    res.send(':S', 500);
});

/* App launch */
app.listen(process.env.PORT || 2020);
console.log('Clonio running :)');
