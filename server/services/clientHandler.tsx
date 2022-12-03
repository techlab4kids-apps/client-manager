import {Command} from "../models/command";
import {clientNameSpace} from "../app";
import { waitUntil } from 'async-wait-until';

export class ClientHandler {
    public executeCommand(command: Command) {
        let clients = clientNameSpace.sockets;

        clients.forEach(async client =>  {
            console.log(`Launching command ${command.commandName} with parameters ${command.commandParameters} and wait: ${command.commandWait} to host: ${client.data.ip}`)

            let returnValue: any;

            client.emit('launchCommand', command, function (retValue: string) {
                returnValue = retValue;
                console.log("retValue: " + JSON.stringify(returnValue));
            });

            try{
                await waitUntil(() => (returnValue != undefined), {timeout: 20000});
            }
            catch (e) {
                console.log("Command execution seems to take too long... Going on")
            }
        })
    }
}

export const clientHandler = new ClientHandler();