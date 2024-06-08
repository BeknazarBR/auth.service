require('dotenv').config();
const express = require('express');
const database = require('./global/database');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./global/middlewares/error-handling.middleware');
const appConfig = require('./global/config/app.config');
const storageService = require('./global/storage/service');

const PORT = appConfig.port;

const app = express();

app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandler);

const start = async () => {
    try {
        storageService.init();
        await database.authenticate();
        await database.sync();

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}


start()
