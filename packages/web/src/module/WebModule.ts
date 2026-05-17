import HttpServer from "../bootstrap/HttpServer";

import type { HttpServerAdapter, MidnightModule } from "../types";

export default class WebModule implements MidnightModule {
    name: string = 'web';

    dependencies: string[] = ['core', 'conversor'];

    constructor(private readonly httpServerAdapter: HttpServerAdapter) {}

    async init() {
        const server = new HttpServer(this.httpServerAdapter);
        await server.start();
    }
}