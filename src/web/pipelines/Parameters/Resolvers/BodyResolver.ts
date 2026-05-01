import Conversor from "../../../../conversor/Conversor";

export default class BodyResolver implements ParamResolver {
    public readonly source: SourceParam;

    constructor() {
        this.source = 'body';
    }

    public resolver(req: HttpRequest, paramMetadata: ParamMetadata) {
        const source = req[this.source];
        return Conversor.convert(source, paramMetadata.type);
    }
}