'use strict';

const {

   ROOT,
   HOST,
   PORT,
   DEBUG,
} = require( './api.config' );

process.env.DEBUG = DEBUG ? 'express:*' : undefined;

const express = require( 'express' ),
   app = express(),
   authenticate = require( './authenticate' ),
   routes = require( './routes' );

app.on( 'error', err => console.log( err ));

app.use( express.json());
app.use( authenticate );
app.use( routes );

app.listen(

   PORT,
   HOST,
   _=> console.log( `api server listen at: ${ HOST }:${ PORT }`),
);
