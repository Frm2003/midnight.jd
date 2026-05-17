import SourceParam from "./SourceParam";

interface ParamMetadata {
    parameterIndex: number;
    name?: string;
    type: any;
    source: SourceParam;
}

export default ParamMetadata;