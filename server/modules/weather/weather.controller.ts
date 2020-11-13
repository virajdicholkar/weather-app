import { Request, Response, Router } from "express";
import { environment } from "../../environment";
import fetch from 'node-fetch';

export class WeatherController {

    router: Router;
    apiKey: string;
    constructor(router: Router) {
        this.apiKey = environment.weatherApiKey;
        this.router = router;
        const commonRoute = '/weather';
        const weatherRouter = this.getRoutes();
        this.router.use(commonRoute, weatherRouter);
    }

    private getRoutes(): Router {
        const weatherRouter = Router();
        weatherRouter
            .get('', this.getWeather)
        return weatherRouter;
    }

    private getWeather = async (req: Request, res: Response, next) => {
        try {
            const dataOfCity = req.query['city'];
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${dataOfCity}&appid=${this.apiKey}`;
            const response = await fetch(url);
            const responseBody = await response.json()
            const list = responseBody.list;
            const city = responseBody.city;
            res.status(200).json({ list, city });
        } catch (error) {
            const message = error.message || 'Oops! Something went wrong!';
            const code = error.code || 500;
            res.status(code).json({ message });
        } finally {
            next();
        }
    }

}