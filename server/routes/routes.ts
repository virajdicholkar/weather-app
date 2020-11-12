
import express = require('express')

import { WeatherController } from "../modules/weather/weather.controller";

import { logRequest } from './../middlewares/request-log.middleware';
import { logResponse } from './../middlewares/response-log.middleware';
class Routes {
    private router = express.Router();

    public routes(): express.Router {
        this.router.use(logRequest)
        const userController = new WeatherController(this.router);
        this.router.use(logResponse)
        return this.router;
    }
}

export const routes = new Routes();