'use strict';

const {Router} = require( 'express' ),
   router = Router(),
   denied = new Error(),
   error = new Error();

denied.message = 'Access denied';
denied.name = 'Access Denied';
denied.code = 'ACCESS_DENIED';
denied.status = 403;

error.message = 'An error occurred';
error.name = 'Error';
error.code = 'ERROR';
error.status = 400;

router.use(( req, res, next ) => {

   const token = req.headers.authorization,
      access = token === 'Bearer: access token' || req.url === '/signin';

   if( ! access ){

      return next( denied );
   }

   return next();
});

router.use(( err, req, res, next ) => {

   return res.status( err.status || 400 ).jsonp( err );
});

module.exports = router;
