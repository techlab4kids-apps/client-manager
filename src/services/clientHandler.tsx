import {Command} from "../models/command";
import {serverSocket} from "../App";

export class ClientHandler {
    public executeCommand(command: Command) {
        serverSocket.emit("launchCommand", command);
    }
}

export const clientHandler = new ClientHandler();