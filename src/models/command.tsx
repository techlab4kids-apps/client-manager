
export interface Command {
    commandName: string,
    scriptName: string,
    scriptParameters: string,
    scriptWait: boolean,
    commandType: string
}

export type Commands = Command[];