import * as express from 'express';
import {clientHandler} from "../services/clientHandler";

const clientsRouter = express.Router();

clientsRouter.post('/clients', function(req, res, next) {

  let client = req.body
  let retValue = clientHandler.registerClient(client)
  console.log(retValue);
  res.json({message: retValue})
});

clientsRouter.get('/', function(req, res, next) {

  let retValue = "Client Manager is up and running!"
  console.log(retValue);
  res.json({message: retValue})
});

module.exports = {clientsRouter, clientHandler};
