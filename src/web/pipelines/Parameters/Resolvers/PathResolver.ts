import { FastifyRequest } from "fastify";
import Conversor from "../../../../conversor/Conversor";

export default class PathResolver implements ParamResolver {
    public readonly source: SourceParam;

    constructor() {
        this.source = 'params';
    }

    public resolver(req: FastifyRequest, paramMetadata: ParamMetadata) {
        const source = req[this.source] as any;
        const rawValue = source[paramMetadata.name!];
        return Conversor.convert(rawValue, paramMetadata.type);
    }
}