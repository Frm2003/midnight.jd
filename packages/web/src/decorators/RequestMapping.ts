import { METADATA_KEYS } from "../metadatas/metadataKeys";

import type { HttpMethod, RouteDefinition } from "../types";

export default function RequestMapping({
    httpMethod,
    path
}: {
    path?: `/${string}`;
    httpMethod: HttpMethod;
}): MethodDecorator {
    return function (
        target: Object,
        propertyId: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        if (!originalMethod) return;

        const existingRoutes: RouteDefinition[] = Reflect.getMetadata('routes', target) || [];

        existingRoutes.push({ path: path ?? '', httpMethod, method: propertyId });

        Reflect.defineMetadata(METADATA_KEYS.ROUTES, existingRoutes, target);
    };
}