import fastify, { type FastifyInstance } from 'fastify';
import Dispatcher from '../pipelines/Dispatcher';

export default class HttpServer {
    private fastifyInstance: FastifyInstance;

    constructor() {
        this.fastifyInstance = fastify({ logger: true });
    }

    private registerRoutes(): void {
        new Dispatcher(this.fastifyInstance).resolveHandler();
    }

    public async start() {
        try {
            this.registerRoutes();
            await this.fastifyInstance.listen({ port: 8080 });
        } catch (err) {
            this.fastifyInstance.log.error(err);
            process.exit(1);
        }
    }
}