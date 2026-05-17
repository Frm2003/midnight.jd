import RouteDefinition from "./RouteDefinition";

interface HttpServerAdapter {
    registerRoute({ }: RouteDefinition): void;
    listen(port: number): Promise<void>;
    logError(err: any): void;
}

export default HttpServerAdapter;