/*****************************
 * Cartel Simulator V1.0
 * @author Alejandro Tardín
 *****************************/
var express   = require('express');
var app       = express();

/*****************************
 * Public files
 *****************************/
app.use('/', express.static(__dirname + '/public'));

/* App launch */
app.listen(process.env.PORT || 2020);
console.log('Cartel running :)');
