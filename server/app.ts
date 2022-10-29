import express from 'express';
import cors, {CorsOptions} from 'cors';
const bodyParser = require("body-parser");

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const {clientsRouter} = require('./routes/clients');

export const app = express();

app.on('error', (e) => {
    logger.log('app ERROR:', e)
})

const corsOptions: CorsOptions = {
    origin: '*'
}

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.set('/', indexRouter);
app.use('/api', clientsRouter);
