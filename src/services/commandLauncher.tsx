import {clientHandler} from "./clientHandler"
import {Command} from "../models/command";
export const launchCommand = (command: Command) => {
    clientHandler.executeCommand(command);
}