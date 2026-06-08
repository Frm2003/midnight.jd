import { Conversor } from "@midnightjd/conversor";

import type { HttpRequest, ParamMetadata, ParamResolver, SourceParam } from "../../../types";

export default class PathResolver implements ParamResolver {
    public readonly source: SourceParam;

    constructor() {
        this.source = 'path';
    }

    public resolver(req: HttpRequest, paramMetadata: ParamMetadata) {
        const source = req[this.source] as any;
        const rawValue = source[paramMetadata.name!];
        return Conversor.convert(rawValue, paramMetadata.type);
    }
}