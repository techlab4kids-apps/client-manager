import express from "express";
import cors, {CorsOptions} from 'cors';
const bodyParser = require("body-parser");

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

export const app = express();

import { createServer } from "http";
import { Server, Socket } from "socket.io";
import {clientHandler} from "./services/clientHandler";
import {ClientData} from "./models/clientData";
import {Command} from "./models/command";
export const httpServer = createServer(app);

interface ServerToClientEvents {
    noArg: () => void;
    server_not_ready: (message: string) => void;
    updatedClients: () => void;
    launchCommand: (command: Command, fn: Function) => string;
}

interface ClientToServerEvents  {
    introduce: (clientData: ClientData) => void;
    launchCommand: (command: Command) => void;
}

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    ClientData>(httpServer, {
    cors: {
        origin: '*'
    }
})

app.on('error', (e) => {
    logger.log('app ERROR:', e)
})

const corsOptions: CorsOptions = {
    origin: '*'
}

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const clientManagerNameSpace = io.of("/manager-namespace");
let clientManagerSocket: Socket;

clientManagerNameSpace.on("connection", socket => {
    console.log("client manager connected with ID: " + socket.id);
    clientManagerSocket = socket;

    const sockets = Array.from(clientNameSpace.sockets).map(socket => socket[0]);
    clientManagerSocket.emit("updatedClients", {clients: sockets})

    socket.on("launchCommand", (command: Command) => {
        console.log("command received: " + JSON.stringify(command));
        clientHandler.executeCommand(command);
    })
})

export const clientNameSpace = io.of("/client-namespace");

clientNameSpace.on("connection", clientSocket => {
    console.log("Client with ID: " + clientSocket.id + " is now connected");

    clientSocket.on("introduce", (clientData: ClientData) => {
        if(clientManagerSocket) {
            clientSocket.data = clientData;
            const sockets = Array.from(clientNameSpace.sockets).map(socket => socket[0]);
            clientManagerSocket.emit("updatedClients", {clients: sockets});
        }
        else{
            clientSocket.emit("server_not_ready", "Server not ready yet")
        }
    })


    clientSocket.on("disconnect", () => {
        console.log("Disconnecting: client");
        const sockets = Array.from(clientNameSpace.sockets).map(socket => socket[0]);
        try{
            clientManagerSocket.emit("updatedClients", {clients: sockets});
        }
        catch (e){
            console.log("Exception notifying client disconnection: " + JSON.stringify(e));
        }
    });
})
