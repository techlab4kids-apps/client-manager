import React, {Component} from 'react';
import {io} from "socket.io-client";

import './App.css';
import Header from "./components/header/header.component";
import Body from './components/body/body.component';

import create from 'zustand/vanilla'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export const clientsStore = create((set) => ({
    clientsCount: 0,
    clients: {},
    updateClients: (clientsUpdated) => set((state) => ({clients: clientsUpdated})),
}))

export const serverSocket = io("http://localhost:1337/manager-namespace");

function useUpdateClients(updatedClients) {
    const updateClients = clientsStore.getState().updateClients;
    let clients = updatedClients.clients;
    updateClients(clients);
}

export default function App() {

    serverSocket.on("connect", () => {
        console.log(serverSocket.id);
        serverSocket.emit("introduce", {hostname: "admin-client"})
    });

    serverSocket.on("updatedClients", (clientsUpdated) => {
        console.log("Clients updated: " + JSON.stringify(clientsUpdated));
        useUpdateClients(clientsUpdated);
    });

    serverSocket.on("disconnect", () => {
        console.log("Disconnecting");
    });

    return (
    <QueryClientProvider client={queryClient}>
        <React.Fragment>
            <Header/>
            <Body/>
            {/*<Footer />*/}
        </React.Fragment>
    </QueryClientProvider>
    );
}
