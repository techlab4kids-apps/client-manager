import express from 'express';
import cors, {CorsOptions} from 'cors';

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes');

const app = express();

app.on('error', (e) => {
    logger.log('app ERROR:', e)
})

const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const PORT = 5500;
const server = app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));

module.exports = server;
