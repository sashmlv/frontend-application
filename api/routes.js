'use strict';

const { Router } = require( 'express' ),
   router = Router(),
   ch = require( 'chalk' ),
   { NOT_FOUND } = require( './errors' ),
   responses = require( './responses' );

router.use(( req, res, next ) => {

   const key = `${ req.method }:${ req.url }`,
      data = responses[ key ],
      response = {

         status: 200,
         data,
         success: true,
      };

   if( ! data  ) {

      return next( NOT_FOUND );
   }

   res.status( response.status ).json( response );
   return next();
});

router.use(( err, req, res, next ) => {

   const response = {

      message: err.message || 'Service error',
      code: err.code || 'SERVICE_ERROR',
      status: err.status || 500,
      success: false,
   };

   res.status( err.status ).json( err );
   return next();
});

module.exports = router;
