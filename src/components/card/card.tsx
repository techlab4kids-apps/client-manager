import './CardStyle.css';

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
import {
    Autocomplete, Box,
    CardHeader, Checkbox,
    createFilterOptions,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, FormControlLabel,
    Icon,
    TextField
} from "@mui/material";

import {orange} from "@mui/material/colors";

import {CardContent} from "./CardStyles"
import {Command} from "../../models/command";
import {clientHandler} from "../../services/clientHandler";

import sites from 'src/configuration/sites.json';

const siteList: readonly SiteOptionType[] = sites
import {BaseSyntheticEvent, useEffect, useState} from "react";

const filter = createFilterOptions<SiteOptionType>();

function getIcon(commandType: string) {
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
    return (<Componenent sx={{color: orange[500]}}/>);
}

export default function CommandCard({
                                        commandDescription,
                                        commandName,
                                        commandParameters,
                                        commandWait,
                                        commandScript,
                                        commandType,
                                        commandConfirm
                                    }: Command) {
    const [open, toggleOpen] = React.useState(false);
    const [siteName, setSiteName] = useState('');
    const [value, setValue] = useState<SiteOptionType | null>(null);
    const [siteUrl, setSiteUrl] = useState('');
    const [dialogValue, setDialogValue] = React.useState({name: '', url: '',});
    const [commandState, setCommandState] = useState('');
    const [commandParametersState, setCommandParametersState] = useState('');
    const [commandWaitState, setCommandWaitState] = useState(false);
    const [commandScriptState, setCommandScriptState] = useState(false);
    const [confirmCommandExecution, setConfirmCommandExecution] = useState(false);

    const [openDialog, setOpenDialog] = React.useState(false);

    const [command, setCommand] = React.useState<Command>({
        commandName: "commandName",
        commandParameters: "",
        commandWait: false,
        commandScript: false,
        commandDescription: "scriptName",
        commandType: "commandType",
        commandConfirm: false
    });

    const handleDialogClose = (event: BaseSyntheticEvent) => {
        setConfirmCommandExecution(false);
        if (event.currentTarget.innerText == "ESEGUI") {
            // setConfirmCommandExecution(true);
            executeCommand();
        }
        setOpenDialog(false);

    };

    const [siteListCached, setSiteListCached] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("siteListCached");
        const initialValue: SiteOptionType[] = JSON.parse(saved);
        return initialValue || siteList;
    });

    const handleCommandFormChange = (currentEvent: BaseSyntheticEvent) => {
        switch (currentEvent.target.name) {
            case "command":
                setCommandState(currentEvent.target.value);
                break;
            case "parameters":
                setCommandParametersState(currentEvent.target.value);
                break;
            case "wait":
                setCommandWaitState(currentEvent.target.checked);
                break;
            case "script":
                setCommandScriptState(currentEvent.target.checked);
                break;
        }

    }

    const handleCommandFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    const handleClose = () => {
        setDialogValue({
            name: '',
            url: '',
        });
        toggleOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValue({
            name: dialogValue.name,
            url: dialogValue.url
        });
        localStorage.setItem("siteListCached", JSON.stringify(value));
        handleClose();
    };

    function executeCommand() {
        // if (confirmCommandExecution) {
            console.log(`Launching command ${command.commandName} with parameters ${command.commandParameters} and wait: ${command.commandWait}`);
            clientHandler.executeCommand(command);
        // }
    }

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, commandName: string, commandParameters: string, commandWait: boolean, commandScript: boolean, commandConfirm: boolean) => {
        if (commandName == "runBrowser.sh") {
            commandParameters = value.url;
            commandScript = true;
        }
        const command: Command = {
            commandName: commandName,
            commandParameters: commandParameters,
            commandWait: commandWait,
            commandScript: commandScript,
            commandDescription: "scriptName",
            commandType: "",
            commandConfirm: false
        }

        setCommand(command);

        if (commandConfirm) {
            setOpenDialog(true);
        }
        else{
            // setConfirmCommandExecution(true);
            executeCommand()
        }

    }

    const handleCommandClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const command: Command = {
            commandName: commandName,
            commandParameters: commandParameters,
            commandWait: commandWait,
            commandScript: commandScript,
            commandDescription: "scriptName",
            commandType: "",
            commandConfirm: false
        }

        setCommand(command);
        // setConfirmCommandExecution(true);
        executeCommand()
    }

    function runBrowserBlock() {
        return (<Grid2 xs={4}>
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
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        fullWidth
                        options={siteListCached}
                        value={siteName}
                        getOptionLabel={(option) => {
                            // e.g value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return option;
                            }
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            return option.name;
                        }}

                        onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                                // timeout to avoid instant validation of the dialog's form.
                                setTimeout(() => {
                                    toggleOpen(true);
                                    setDialogValue({
                                        name: "",
                                        url: newValue,
                                    });
                                });
                            } else if (newValue && newValue.inputValue) {
                                toggleOpen(true);
                                setDialogValue({
                                    url: newValue.inputValue,
                                    name: '',
                                });
                            } else {
                                setValue(newValue);
                            }
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            // if (params.inputValue !== '') {
                            //     filtered.push({
                            //         inputValue: params.inputValue,
                            //         name: `Aggiungi "${params.inputValue}"`,
                            //         url: `Aggiungi "${params.inputValue}"`
                            //     });
                            // }

                            return filtered;
                        }}

                        freeSolo
                        disableClearable
                        renderOption={(props, option) => <li {...props}>{option.name}</li>}

                        renderInput={(params) => (
                            <TextField
                                required
                                {...params}
                                label="Url"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />

                    <Dialog open={open} onClose={handleClose}>
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Aggiungi una nuova URL</DialogTitle>
                            <DialogContent>

                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    value={dialogValue.name}
                                    onChange={(event) =>
                                        setDialogValue({
                                            ...dialogValue,
                                            name: event.target.value,
                                        })
                                    }
                                    label="nome"
                                    type="text"
                                    variant="standard"
                                />
                                <TextField
                                    margin="dense"
                                    id="name"
                                    value={dialogValue.url}
                                    onChange={(event) =>
                                        setDialogValue({
                                            ...dialogValue,
                                            url: event.target.value,
                                        })
                                    }
                                    label="URL"
                                    type="text"
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Annulla</Button>
                                <Button type="submit">Aggiungi</Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                    {/*<TextField id="outlined-basic" label="Url" variant="outlined"/>*/}
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                    <Button variant="contained" size="large"
                            onClick={(e) => handleClick(e, commandName, commandParameters, commandWait, commandScript, false)}>Esegui</Button>
                </CardActions>
            </Card>
        </Grid2>);
    }

    function commandBlock() {
        return (<Grid2 xs={4}>
            <Card sx={{maxWidth: 345}}>
                <CardHeader
                    title={getIcon(commandType)}
                    // subtitle="Subtitle"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" align={"center"}>
                        {commandDescription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align={"center"}>
                        <form onSubmit={handleCommandFormSubmit}>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': {m: 1, width: '25ch'},
                                }}
                                noValidate
                                // autoComplete="off"
                            >
                                <div>
                                    <TextField
                                        required
                                        name="command"
                                        id="command"
                                        label="Comando"
                                        defaultValue="kill"
                                        onChange={handleCommandFormChange}
                                    />
                                    <TextField
                                        name="parameters"
                                        id="parameters"
                                        label="Parametri"
                                        defaultValue="all"
                                        onChange={handleCommandFormChange}
                                    />
                                    <FormControlLabel
                                        name="wait"
                                        onChange={handleCommandFormChange}
                                        control={<Checkbox/>
                                        } label="Attendi"/>
                                    <FormControlLabel
                                        onChange={handleCommandFormChange}
                                        name="script"
                                        control={<Checkbox/>
                                        } label="Script"/>
                                </div>
                            </Box>
                        </form>
                    </Typography>

                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                    <Button variant="contained" size="large"
                            onClick={(e) => handleCommandClick(e)}>Esegui</Button>
                </CardActions>

            </Card>
        </Grid2>);
    }

    switch (commandName) {
        case "runBrowser.sh": {
            return runBrowserBlock()
        }
        case "comando": {
            return commandBlock()
        }
        default: {
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
                            <Button variant="contained" size="large"
                                    onClick={(e) => handleClick(e, commandName, commandParameters, commandWait, commandScript, commandConfirm)}>Esegui</Button>
                        </CardActions>
                    </Card>

                    <Dialog
                        open={openDialog}
                        onClose={handleDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Comando potenzialmente pericoloso!"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Sei sicur3 di voler eseguire il comando?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClose} autoFocus>Annulla</Button>
                            <Button onClick={handleDialogClose}>Esegui</Button>
                        </DialogActions>
                    </Dialog>
                </Grid2>
            );
        }
    }
}