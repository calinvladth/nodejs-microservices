import {Express} from "express";
import {services} from "./services";
import {middleware} from "./middleware";


function routes(app: Express) {
    app.get('/', async (req, res) => {
        res.send({
            message: 'Hola from customer service'
        });
    });

    app.post('/auth/signup', services.auth.signUp)
    app.post('/auth/signin', services.auth.signIn)

    app.get('/protected', [middleware.verifyTokenController], services.auth.checkProtection)
}


export default routes