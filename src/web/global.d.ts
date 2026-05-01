import type { FastifyReply, FastifyRequest } from "fastify";

export { };

declare global {
    type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

    type OriginalMethod = (...args: any[]) => any;

    type RouteDefinition = {
        path: string;
        httpMethod: HttpMethod;
        method: string | symbol;
        controller?: AnyController;
    };

    type AnyController = {
        [key: string | symbol]: (...args: any[]) => any;
    };

    type SourceParam = 'params' | 'body' | 'query';

    interface ParamMetadata {
        parameterIndex: number;
        name?: string;
        type: any;
        source: SourceParam;
    }

    interface ParamResolver {
        readonly source: SourceParam;
        resolver(req: HttpRequest, paramMetadata: ParamMetadata): any;
    }

    interface HttpRequest {
        body?: any;
        query?: Record<string, any>;
        path?: Record<string, any>;
        headers?: Record<string, string>;
    }

    export interface HttpServerAdapter {
        registerRoute({}: RouteDefinition): void;
        listen(port: number): Promise<void>;
        logError(err: any): void;
    }
}