import "reflect-metadata";

import BeanRegistry from "../di/BeanRegistry";
import BeanScanner from "../di/BeanScanner";
import Container from "../di/Container";
import FactoryResolver from "../di/FactoryResolver";
import Loader from "../infra/Loader";

import type { BeanDefinition, MidnightModule, ModuleConstructor } from "../types";

export default class ApplicationContext {

    public static async init(modules: MidnightModule[]) {
        const moduleConstructors: ModuleConstructor[] = await Loader.loadImports();
        const beans: Map<symbol, BeanDefinition> = BeanScanner.filterModules(moduleConstructors);

        BeanRegistry.registerAll(beans);

        const factories = FactoryResolver.resolve(beans);

        for (const bean of beans.values()) {
            const factory = factories.get(bean.token);

            if (!factory)
                throw new Error(`Factory not found: ${bean.target.toString()}`);

            Container.register(bean.token, factory, bean.scope);
        }

        for (const module of modules) {
            await module.init();
        }
    }
}