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
   cookieParser = require( 'cookie-parser' ),
   bodyParser = require( 'body-parser' ),
   authenticate = require( './authenticate' ),
   routes = require( './routes' );

app.on( 'error', err => console.log( err ));

app.use( cookieParser());
app.use( bodyParser.json());
app.use( authenticate );
app.use( routes );
app.use(( err, req, res, next ) => { // error handler

   const response = {

      message: err.message || 'Service error',
      code: err.code || 'SERVICE_ERROR',
      status: err.status || 500,
      success: false,
   };

   res.status( err.status ).json( err );
   return next();
});

app.listen(

   PORT,
   HOST,
   _=> console.log( `api server listen at: ${ HOST }:${ PORT }`),
);
