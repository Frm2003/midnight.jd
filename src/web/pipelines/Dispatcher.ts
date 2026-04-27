import { FastifyInstance } from "fastify";
import Router from "./Router";

export default class Dispatcher {
    private declare fastifyInstance: FastifyInstance;

    private constructor(fastifyInstance: FastifyInstance) {
        this.fastifyInstance = fastifyInstance;
    }

    static resolver(fastifyInstance: FastifyInstance): void {
        new Dispatcher(fastifyInstance).registerRoutes();
    }

    private registerRoutes(): void {
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