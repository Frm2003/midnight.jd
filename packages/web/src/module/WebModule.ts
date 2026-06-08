import { Module, type MidnightModule } from "@midnightjd/core";

import Router from "../pipelines/Router";
import HttpServerAdapter from "../bootstrap/HttpServerAdapter";

@Module
export default class WebModule implements MidnightModule {
    name: string = 'web';

    dependencies: string[] = ['core', 'conversor'];

    constructor(private readonly serverAdapter: HttpServerAdapter) { }

    async init() {
        const routes = Router.discover();

        for (const route of routes) {
            this.serverAdapter.registerRoute(route);
        }

        await this.serverAdapter.listen(8080);
    }
}