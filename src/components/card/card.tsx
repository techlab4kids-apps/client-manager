import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';

import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyTwoTone';
import ComputerTwoToneIcon from '@mui/icons-material/ComputerTwoTone';
import MemoryTwoToneIcon from '@mui/icons-material/MemoryTwoTone';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import {CardHeader, Icon} from "@mui/material";
import {orange} from "@mui/material/colors";

import {CardContent} from "./CardStyles"
import {Command} from "../../models/command";
import {clientHandler} from "../../services/clientHandler";

function  getIcon(commandType: string) {
    let icon;
    switch (commandType) {
        case "Documents":
            icon = FileCopyTwoToneIcon;
            break;

        case "Clients":
            icon = ComputerTwoToneIcon;
            break;

        case "Process":
            icon = MemoryTwoToneIcon;
            break;
        default:
            icon = AutoAwesomeTwoToneIcon;
            break;
    }
    const Componenent = icon;
    return (<Componenent sx={{ color: orange[500] }}/>);
}

function handleClick(event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, commandName: string, commandParameters: string, commandWait: boolean) {
    console.log(`Launching command ${commandName} with parameters ${commandParameters} and wait: ${commandWait}`);

    const command: Command = {
        commandDescription: "scriptName",
        commandName: commandName,
        commandParameters: commandParameters,
        commandWait: commandWait,
        commandType: ""
    }
    clientHandler.executeCommand(command);
}

export default function CommandCard({commandDescription, commandName, commandParameters, commandWait, commandType}: Command) {
    return (
        <Grid2 xs={4}>
            <Card sx={{maxWidth: 345}}>

                <CardHeader
                    title={getIcon(commandType)}
                    subtitle="Subtitle"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" align={"center"}>
                        {commandDescription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align={"center"}>
                        {commandName} {commandParameters}
                    </Typography>
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                    <Button variant="contained" size="large" onClick={(e) => handleClick(e, commandName, commandParameters, commandWait)}>Esegui</Button>
                </CardActions>
            </Card>
        </Grid2>
    );
}