import express from "express";
import { connect } from "mongoose";
import productRouter from "./routers/product";
import authRouter from "./routers/auth";

const app = express();

app.use(express.json());


(async () => {
    try {
        await connect(`mongodb://localhost:27017/thi`);
    } catch (error) {
        console.log(error);
    }
})();

app.use(`/api`, productRouter);
app.use(`/api`, authRouter);

export const viteNodeApp = app;

