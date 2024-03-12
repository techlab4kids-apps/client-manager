import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Badge} from "@mui/material";
import ComputerTwoToneIcon from "@mui/icons-material/ComputerTwoTone";
import create from 'zustand'
import {clientsStore} from "../../App";
import version from "../../../package.json";

export default function Header() {

    const useClientsStore = create(clientsStore)

    let clientCount = 0;
    // store.subscribe(() => {
    //     clientCount = store.getState();
    //     console.log("clientCount: " + clientCount)
    // })

    let clients = useClientsStore((state) => state.clients);
    clientCount = clients.length;

    return (
        <AppBar position="static">
            <Toolbar>

                <Typography component="div" sx={{flexGrow: 1}}>
                    <h2 style={{display: "inline", paddingRight: 12}}>
                        TechLAB4Kids client manager
                    </h2>
                    
                    <p1 style={{fontSize: 15}}>
                        {version.version}
                    </p1>

                </Typography>

                <Typography variant="h6"
                            component="div" sx={{flexGrow: 1, textAlign: "right"}}>
                    Client connessi
                    <Badge sx={{m: 1}} badgeContent={clientCount} color="secondary">
                        <ComputerTwoToneIcon color="action"/>
                    </Badge>
                </Typography>

            </Toolbar>
        </AppBar>
    );
}
