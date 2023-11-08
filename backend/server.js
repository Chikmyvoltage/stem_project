const express = require('express');
const routes  = require('./routes');
const approot = require('app-root-path')
const app = express();


app.use(express.static(`${approot}/dist`, { index: false }));
app.use(express.json());
app.use( function(req,res,next) {res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next();} )
app.listen(8080);

routes(app);

module.exports = app;
