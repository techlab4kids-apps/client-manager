import * as React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import {Section} from "./CommandCardsStyles";

import CommandCard from "../card/card";
import {Command} from "../../models/command";

import {configuration} from "../../services/configurationLoader";

export default function CommandCardsComponent() {

    const commands = configuration().commands

    return (
        <Section>
            {
                commands=='Loading...' &&
                <div>
                    Loading
                </div>
            }
            {
                commands!='Loading...' &&

                <Grid2 container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 2}}>
                    {
                        commands.map((command: Command, idx: React.Key) => (
                            <CommandCard key={idx} {...command} />
                        ))}
                </Grid2>
            }
        </Section>
    );
}
