import type { FastifyReply, FastifyRequest } from "fastify";

export { };

declare global {
    type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

    type OriginalMethod = (...args: any[]) => any;

    type Handler = (req: FastifyRequest, res: FastifyReply) => Promise<void>;

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
        resolver(req: FastifyRequest, paramMetadata: ParamMetadata): any;
    }

    type Converter = (value: any) => any;
}