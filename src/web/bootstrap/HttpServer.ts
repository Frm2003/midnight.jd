import Router from '../pipelines/Router';

export default class HttpServer {
    private serverAdapter: HttpServerAdapter;

    constructor (serverAdapter: HttpServerAdapter) {
        this.serverAdapter = serverAdapter;
    }

    public dispatch(): void {
        const routes = Router.discover();

        for (const route of routes) {
            this.serverAdapter.registerRoute(route);
        }
    }

    public async start() {
        try {
            this.dispatch();
            await this.serverAdapter.listen(8080);
        } catch (err) {
            this.serverAdapter.logError(err);
            process.exit(1);
        }
    }
}