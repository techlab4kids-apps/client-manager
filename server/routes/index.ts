import * as express from 'express';

const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({message: 'Hi there from Express!'})
});

module.exports = router;
