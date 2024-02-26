import express from "express";
import {database} from "./database";
import {services} from "./services";
import {middleware} from "./middleware";

const router = express.Router();

router.get('/', async (req, res) => {
    res.send({
        message: 'Hola from customer service'
    });
});

router.post('/auth/signup', services.auth.signUp)
router.post('/auth/signin', services.auth.signIn)

router.get('/protected', [middleware.verifyTokenController], services.auth.checkProtection)


export {router as routes}