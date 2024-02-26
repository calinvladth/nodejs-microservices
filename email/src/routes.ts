import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    res.send({
        message: "Hola from email service"
    });
});


export {router as routes}