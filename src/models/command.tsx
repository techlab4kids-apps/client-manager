
export interface Command {
    commandDescription: string,
    commandName: string,
    commandParameters: string,
    commandWait: boolean,
    commandType: string,
    commandScript: boolean,
    commandConfirm: boolean
}

export type Commands = Command[];