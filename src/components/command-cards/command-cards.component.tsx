import * as React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import {Section} from "./CommandCardsStyles";

import jsonCommands from 'src/configuration/commands.json';

import CommandCard from "../card/card";
import {Command, Commands} from "../../models/command";

export default function CommandCardsComponent() {

    const loadedData = JSON.stringify(jsonCommands);
    const commands: Commands = JSON.parse(loadedData);

    return (
        <Section>
            <Grid2 container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 2}}>
                {commands.map((command: Command, idx: React.Key) => (
                    <CommandCard key={idx} {...command} />
                ))}
            </Grid2>
        </Section>
    );
}