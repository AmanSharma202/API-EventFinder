const { Router } = require("express");
const controller = require("./controller");

const routes = Router();

routes.get("/", controller.postAllEvents);
routes.get("/:date/:lat/:long/:page", controller.getEventsByDate);

module.exports = routes;
