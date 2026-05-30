import { METADATA_KEYS } from "../metadatas/metadataKeys";

import type { BeanDefinition, BeanScope, ModuleConstructor, Token } from "../types";

export default class BeanScanner {

    public static filterModules(modules: ModuleConstructor[]): Map<Token, BeanDefinition> {
        const beans: Map<Token, BeanDefinition> = new Map();

        for (const module of modules) {
            const isComponent: boolean = Reflect.getMetadata(METADATA_KEYS.COMPONENT, module);

            if (isComponent) {
                const dependencies: ModuleConstructor[] = Reflect.getMetadata("design:paramtypes", module) ?? [];
                const stereoType = Reflect.getMetadata(METADATA_KEYS.STEREOTYPES, module) ?? 'component';
                const scope: BeanScope = Reflect.getMetadata(METADATA_KEYS.SCOPE, module) ?? 'singleton';

                const parent = Object.getPrototypeOf(module);

                const token: Token = parent.name ? parent : module;

                beans.set(token, {
                    target: module,
                    token: module,
                    dependencies,
                    scope,
                    stereoType,
                });
            }
        }

        return beans;
    }
}