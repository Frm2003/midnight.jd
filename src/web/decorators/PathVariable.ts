import { METADATA_KEYS } from "../metadatas/metadataKeys";

export default function PathVariable(name: string): ParameterDecorator {
    return function (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) {
        if (!propertyKey) return;

        const existingParams: ParamMetadata[] =
            Reflect.getOwnMetadata(METADATA_KEYS.PARAMS_VARIABLES, target, propertyKey) ?? [];

        const types: any = Reflect.getMetadata("design:paramtypes", target, propertyKey) as any[];
        const type = types[parameterIndex];

        existingParams.push({
            name,
            type,
            source: 'params',
            parameterIndex,
        });

        Reflect.defineMetadata(METADATA_KEYS.PARAMS_VARIABLES, existingParams, target, propertyKey);
    }
}