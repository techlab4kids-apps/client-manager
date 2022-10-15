import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Body from './components/body/body.component';

import { createSlice, configureStore } from '@reduxjs/toolkit'

const clientCounterSlice = createSlice({
    name: 'clientCounter',
    initialState: {
        value: 0
    },
    reducers: {
        incremented: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decremented: state => {
            state.value -= 1
        }
    }
})

export const { incremented, decremented } = clientCounterSlice.actions

export const store = configureStore({
    reducer: clientCounterSlice.reducer
})

ReactDOM.render(
    <React.Fragment>
        <Header />
        <Body />
        {/*<Footer />*/}
    </React.Fragment>,
    document.getElementById("root")
);
