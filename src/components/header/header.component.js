import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Badge} from "@mui/material";
import ComputerTwoToneIcon from "@mui/icons-material/ComputerTwoTone";
import PubSub from "pubsub-js"
import {store} from "../../index";

export default function Header() {

    let clientCount = 0;
    store.subscribe(() => {
        clientCount = store.getState();
        console.log("clientCount: " + clientCount)
    })

    return (
        <AppBar position="static">
            <Toolbar>
                {/*Inside the IconButton, we
           can render various icons*/}
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>

                <Typography variant="h6"
                            component="div" sx={{flexGrow: 1}}>
                    TechLAB4Kids client manager
                </Typography>

                <Typography variant="h6"
                            component="div" sx={{flexGrow: 1}}>
                    Client connessi
                    <Badge sx={{m: 1}} badgeContent={clientCount} color="secondary">
                        <ComputerTwoToneIcon color="action"/>
                    </Badge>
                </Typography>

            </Toolbar>
        </AppBar>
    );
}