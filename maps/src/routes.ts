import {Express} from "express";
import {services} from "./services";
import {middlewares} from "./middlewares";


function routes(app: Express) {
    app.get('/', [middlewares.verifyTokenController], services.maps.get);
    app.post('/', [middlewares.verifyTokenController], services.maps.create);
    app.get('/:map_id', [middlewares.verifyMapState],  services.maps.getById);
    app.patch('/:map_id', [middlewares.verifyTokenController], services.maps.update);
    app.delete('/:map_id',[middlewares.verifyTokenController], services.maps.remove);
    app.get('/:map_id/categories', [middlewares.verifyMapState], services.categories.get);
    app.get('/:map_id/picks', [middlewares.verifyMapState], services.picks.get);
    app.post('/:map_id/picks', [middlewares.verifyTokenController], services.picks.create);
    app.get('/:map_id/picks/:pickId', [middlewares.verifyMapState], services.picks.getById);
    app.patch('/:map_id/picks/:pickId', [middlewares.verifyTokenController], services.picks.update);
    app.delete('/:map_id/picks/:pickId', [middlewares.verifyTokenController], services.picks.remove);
}


export default routes