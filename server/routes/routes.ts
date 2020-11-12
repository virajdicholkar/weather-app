
import express = require('express')

import { WeatherController } from "../modules/weather/weather.controller";

class Routes {
    private router = express.Router();

    public routes(): express.Router {
        const userController = new WeatherController(this.router);
        return this.router;
    }
}

export const routes = new Routes();