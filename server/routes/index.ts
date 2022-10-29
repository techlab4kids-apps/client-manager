import * as express from 'express';

const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({message: 'Client Manager up & running!'})
});

module.exports = router;
