import { FastifyReply } from "fastify";

export { };

declare global {
    type BeanFactory<T = any> = () => T;

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
}