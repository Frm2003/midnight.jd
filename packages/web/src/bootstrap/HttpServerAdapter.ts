import { RouteDefinition } from "../types";

export default abstract class HttpServerAdapter {
    abstract registerRoute({ }: RouteDefinition): void;
    abstract listen(port: number): Promise<void>;
    abstract logError(err: any): void;
}