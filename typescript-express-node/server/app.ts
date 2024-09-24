import express, { Application, Request, Response, NextFunction} from "express";
import {ExpressError, NotFoundError } from "./expressError";

const app: Application = express();
app.use(express.json());

app.get("/", function (req, res) {
    return res.send(`hello`);
});

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    throw new NotFoundError();
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err: ExpressError, req: Request, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err?.status ?? 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

export default app;