import { METADATA_KEYS } from "../metadatas/metadataKeys";

import type { BeanDefinition, BeanScope, ModuleConstructor } from "../types";

export default class BeanScanner {

    public static filterModules(modules: ModuleConstructor[]): Map<symbol, BeanDefinition> {
        const beans: Map<symbol, BeanDefinition> = new Map();

        for (const module of modules) {
            const isComponent: boolean = Reflect.getMetadata(METADATA_KEYS.COMPONENT, module);

            if (isComponent) {
                const dependencies: ModuleConstructor[] = Reflect.getMetadata("design:paramtypes", module) ?? [];
                const stereoType = Reflect.getMetadata(METADATA_KEYS.STEREOTYPES, module) ?? 'component';
                const scope: BeanScope = Reflect.getMetadata(METADATA_KEYS.SCOPE, module) ?? 'singleton';
                
                const token = Symbol(module.name);

                beans.set(token, {
                    target: module,
                    token: Symbol(module.name),
                    dependencies,
                    scope,
                    stereoType,
                })
            }
        }

        return beans;
    }
}