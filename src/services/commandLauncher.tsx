import {Command} from "../models/command";
import {clientHandler} from "./clientHandler"
export const launchCommand = (command: Command) => {
    // const clients: Clients = [{"hostname": "pippo", "ip": "localhost:3031", "updateTime": ""}]
    //
    // clients.map(client => {
    //     console.log(`Launching command ${command.scriptName} with parameters ${command.scriptParameters} and wait: ${command.scriptWait} to host: ${client.ip}`)
    //
    //     axios.post(`http://${client.ip}/commands/${command.scriptName}`, command).then(res => {
    //
    //     });
    // })

    clientHandler.executeCommand(command);

}