import * as express from 'express';
import {clientHandler} from "../../src/services/clientHandler";

const clientsRouter = express.Router();

clientsRouter.post('/clients', function(req, res, next) {

  let client = req.body
  let retValue = clientHandler.registerClient(client)
  console.log(retValue);
  res.json({message: retValue})
});

module.exports = {clientsRouter, clientHandler};
