
export interface Command {
    commandDescription: string,
    commandName: string,
    commandParameters: string,
    commandWait: boolean,
    commandType: string
}

export type Commands = Command[];