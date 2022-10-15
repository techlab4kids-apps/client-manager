import * as express from 'express';
import {ClientHandler} from "../../src/services/clientHandler";

const router = express.Router();
const clientHandler = new ClientHandler();

router.get('/', function(req, res, next) {
  res.json({message: 'Client Manager up & running!'})
});

// router.post('/clients', function(req, res, next) {
//   let client = req.body
//   let registrationStatus = clientHandler.registerClient(client);
//
//   console.log(registrationStatus)
//   res.json({message: registrationStatus})
// });

module.exports = router;
