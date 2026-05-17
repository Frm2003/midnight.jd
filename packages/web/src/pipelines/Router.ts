import { METADATA_KEYS } from "../metadatas/metadataKeys";
import ControllerResolver from "./ControllerDiscovery";

import type { AnyController, RouteDefinition } from "../types";

export default class Router {

    public static discover(): RouteDefinition[] {
        const controlles = ControllerResolver.resolve() as AnyController[];
        const routes: RouteDefinition[] = []

        for (const controller of controlles) {
            const classPath = Reflect.getMetadata(METADATA_KEYS.CLASS_ROUTE, controller.constructor);
            const definitions: RouteDefinition[] = Reflect.getMetadata(METADATA_KEYS.ROUTES, controller) ?? [];

            for (const { httpMethod, method, path: routePath } of definitions) {
                routes.push({
                    httpMethod,
                    path: `${classPath ?? '/'}${routePath ?? ''}`,
                    controller,
                    method,
                });
            }
        }

        return routes;
    }
}