import { METADATA_KEYS } from "../../metadatas/metadataKeys";

import PathResolver from "./Resolvers/PathResolver";
import BodyResolver from "./Resolvers/BodyResolver";

import type { AnyController, HttpRequest, ParamMetadata, ParamResolver } from "../../types";

export default class ParameterResolver {
    private static resolvers: ParamResolver[];

    static {
        this.resolvers = [
            new PathResolver(),
            new BodyResolver()
        ];
    }

    public static getArgs(req: HttpRequest, controller: AnyController, method: string | symbol): any[] {
        const resolvedParams: any[] = [];

        const params: ParamMetadata[] =
            Reflect.getMetadata(METADATA_KEYS.PARAMS_VARIABLES, controller, method);

        if (!params) return resolvedParams;

        const orderedParams = [...params].sort((a, b) => a.parameterIndex - b.parameterIndex);

        for (const param of orderedParams) {
            const resolver = this.resolvers.find(resolver => resolver.source == param.source);
            if (!resolver) throw new Error(`No resolver found for source "${param.source}"`);
            resolvedParams.push(resolver.resolver(req, param));
        }

        return resolvedParams;
    }
}