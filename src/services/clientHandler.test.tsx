import {Client} from "../models/client"
import {ClientHandler} from "./clientHandler"

describe("ClientHandler tests", () => {
    test('registering a new client increase clients count by 1', () => {
        let clientHandler = new ClientHandler();

        let client1 = {"hostname": "pippo", "ip": "192.168.10.1"} as Client;
        let retValue = clientHandler.registerClient(client1)

        expect(clientHandler.clients.size).toBe(1);
        expect(retValue).toContain("Added");
    });

    test("registering an already present client doesn't increase clients count", () => {
        let clientHandler = new ClientHandler();

        let client1 = {"hostname": "pippo", "ip": "192.168.10.1"} as Client;
        clientHandler.registerClient(client1)

        let client2 = {"hostname": "pippo", "ip": "192.168.10.1"} as Client;
        let retValue = clientHandler.registerClient(client1)

        expect(clientHandler.clients.size).toBe(1);
        expect(retValue).toContain("Replacing");
    });

    test("registering a client client with and already registered host name doesn't increase clients count", () => {
        let clientHandler = new ClientHandler();

        let client1 = {"hostname": "pippo", "ip": "192.168.10.1"} as Client;
        clientHandler.registerClient(client1)

        let client2 = {"hostname": "pippo", "ip": "192.168.10.2"} as Client;
        let retValue = clientHandler.registerClient(client1)

        expect(clientHandler.clients.size).toBe(1);
        expect(retValue).toContain("Replacing");
    });
})