import HttpRequest from "./HttpRequest";
import ParamMetadata from "./ParamMetadata";
import SourceParam from "./SourceParam";

interface ParamResolver {
    readonly source: SourceParam;
    resolver(req: HttpRequest, paramMetadata: ParamMetadata): any;
}

export default ParamResolver;