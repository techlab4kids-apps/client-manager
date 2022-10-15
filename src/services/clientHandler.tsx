import {Client} from "../models/client"
import axios from "axios";
import {Command} from "../models/command";
import {incremented, store} from "../index";

export class ClientHandler {
    clients = new Map<string, Client>();

    registerClient(client: Client) {
        let retValue;
        if (this.clients.has(client.hostname)) {
            let oldClientIP = this.clients.get(client.hostname).ip;
            let clientIP = client.ip;
            this.clients.delete(client.hostname);
            retValue = `Replacing client ${client.hostname} already present with IP: ${oldClientIP} with new IP ${clientIP}`
        } else {
            retValue = `Added new client ${client.hostname} with IP: ${client.ip}`
            store.dispatch(incremented())
        }
        const now = new Date();
        client.updateTime = now.toLocaleString();
        this.clients = this.clients.set(client.hostname, client);
        return retValue;
    }

    public executeCommand(command: Command) {
        this.clients.forEach(client => {
            console.log(`Launching command ${command.scriptName} with parameters ${command.scriptParameters} and wait: ${command.scriptWait} to host: ${client.ip}`)

            axios.post(`http://${client.ip}/commands/${command.scriptName}`, command);
        })
    }
}

export const clientHandler = new ClientHandler();