import {Express} from "express";


function routes(app: Express) {
    app.get('/', async (req, res) => {
        res.send({
            message: "Hola from email service"
        });
    });

    app.post('/confirmation-email',  (req, res) => {
        res.send('Confirmation Email')
    })
}


export default routes