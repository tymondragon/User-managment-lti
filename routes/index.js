const express = require('express');
const router = express.Router();
let jwk2pem = require('pem-jwk').jwk2pem
const {
  AGPayload,
  ContentItem,
  JWTPayload,
  NRPayload,
  GroupsPayload,
  SetupParameters
} = require("../web/common/restTypes");

router.get('/login', function (req, res, next) {
  req.session = {
    userId: 1
  }
  res.render('index', { title: 'LTI POO' });
});
router.get('/logout', function (req, res, next) {
  req.session = {
    userId: null
  }
  res.render('index', { title: 'GOODBYE' });
});

module.exports = router;


  // req.hypermediaBase = `${ req.protocol }://${ req.get('host') }`;
