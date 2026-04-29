import "reflect-metadata";

import ApplicationContext from "./core/bootstrap/ApplicationContext";
import HttpServer from "./web/bootstrap/HttpServer";

const start = async () => {
    await ApplicationContext.init();
    await new HttpServer().start();
}

start();