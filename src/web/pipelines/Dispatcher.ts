import { FastifyInstance } from "fastify";
import Router from "./Router";

export default class Dispatcher {
    private declare fastifyInstance: FastifyInstance;

    constructor(fastifyInstance: FastifyInstance) {
        this.fastifyInstance = fastifyInstance;
    }

    public resolveHandler() {
        const routes: RouteDefinition[] = Router.discover();

        for (const { controller, httpMethod, method, path: url } of routes) {
            const handler: Handler = async (req, res) => {
                const result = await controller![method].call(controller);
                res.status(200).send(result);
            };

            this.fastifyInstance.route({
                method: httpMethod,
                url,
                handler,
            });
        }
    }
}