import express from 'express'
import cors from 'cors'
import proxy from 'express-http-proxy'
import {config} from "./config";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/customer", proxy("http://localhost:3001"));
app.use("/email", proxy("http://localhost:3002"));

app.listen(config.PORT, () => {
    console.log("Gateway is Listening to Port 8000");
});