import {Express} from "express";
import {services} from "./services";


function routes(app: Express) {
    app.get('/', services.maps.get);
    app.post('/', services.maps.create);
    app.get('/:mapId', services.maps.getById);
    app.patch('/:mapId', services.maps.update);
    app.delete('/:mapId', services.maps.remove);
    app.get('/:mapId/categories', services.categories.get);
    app.get('/:mapId/picks', services.picks.get);
    app.post('/:mapId/picks', services.picks.create);
    app.get('/:mapId/picks/:pickId', services.picks.getById);
    app.patch('/:mapId/picks/:pickId', services.picks.update);
    app.delete('/:mapId/picks/:pickId', services.picks.remove);
}


export default routes