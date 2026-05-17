import { METADATA_KEYS } from "../metadatas/metadataKeys";

import type { BeanDefinition, BeanScope, ModuleConstructor } from "../types";

export default class BeanScanner {

    public static filterModules(modules: ModuleConstructor[]): Map<ModuleConstructor, BeanDefinition> {
        const beans: Map<ModuleConstructor, BeanDefinition> = new Map();

        for (const module of modules) {
            const isComponent: boolean = Reflect.getMetadata(METADATA_KEYS.COMPONENT, module);

            if (isComponent) {
                const dependencies: ModuleConstructor[] = Reflect.getMetadata("design:paramtypes", module) ?? [];
                const stereoType = Reflect.getMetadata(METADATA_KEYS.STEREOTYPES, module) ?? 'component';
                const scope: BeanScope = Reflect.getMetadata(METADATA_KEYS.SCOPE, module) ?? 'singleton';

                beans.set(module, {
                    target: module,
                    token: module,
                    dependencies,
                    scope,
                    stereoType,
                })
            }
        }

        return beans;
    }
}