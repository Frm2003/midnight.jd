import { FastifyReply, FastifyRequest } from "fastify";

export { };

declare global {
    type Converter = (value: any) => any;
}