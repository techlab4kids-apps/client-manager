import {Command} from "../models/command";
import {clientNameSpace} from "../app";

export class ClientHandler {
    public executeCommand(command: Command) {
        let clients = clientNameSpace.sockets;

        clients.forEach(async client =>  {
            console.log(`Launching command ${command.scriptName} with parameters ${command.scriptParameters} and wait: ${command.scriptWait} to host: ${client.data.ip}`)

            // let retValue = await new Promise(resolve => client.emit("launchCommand", command, (retValue: string) => resolve(retValue)));

            client.emit('launchCommand', command, function (retValue: string) {
                console.log("retValue: " + JSON.stringify(retValue));
            });

            // if (retValue) console.log("retValue: " + retValue);
        })
    }
}

export const clientHandler = new ClientHandler();