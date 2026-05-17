import { METADATA_KEYS } from "../metadatas/metadataKeys";

import type { ParamMetadata } from "../types";

export default function RequestBody(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const existingParams: ParamMetadata[] =
        Reflect.getOwnMetadata(METADATA_KEYS.PARAMS_VARIABLES, target, propertyKey) ?? [];

    const types: any[] = Reflect.getMetadata("design:paramtypes", target, propertyKey);
    const type = types[parameterIndex];

    existingParams.push({
        name: undefined,
        type,
        source: 'body',
        parameterIndex,
    });

    Reflect.defineMetadata(METADATA_KEYS.PARAMS_VARIABLES, existingParams, target, propertyKey);
}
