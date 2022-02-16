import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { HashRouter, Route, Routes} from 'react-router-dom';
import OneRoute from './routes/one/one.route';
import TwoRoute from './routes/two/two.route';

ReactDOM.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="one" element={<OneRoute />} />
                <Route path="two" element={<TwoRoute />} />
            </Route>
        </Routes>
    </HashRouter>,
  document.getElementById('root')
);
