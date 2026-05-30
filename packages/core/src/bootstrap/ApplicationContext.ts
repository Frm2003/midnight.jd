import "reflect-metadata";

import BeanRegistry from "../di/BeanRegistry";
import BeanScanner from "../di/BeanScanner";
import Container from "../di/Container";
import FactoryResolver from "../di/FactoryResolver";
import Loader from "../infra/Loader";

import type { BeanDefinition, MidnightModule, ModuleConstructor, Token } from "../types";

export default class ApplicationContext {

    public static async init() {
        const moduleConstructors: ModuleConstructor[] = await Loader.loadImports();
        const beans: Map<Token, BeanDefinition> = BeanScanner.filterModules(moduleConstructors);

        BeanRegistry.registerAll(beans);

        const factories = FactoryResolver.resolve(beans);

        for (const bean of beans.values()) {
            const factory = factories.get(bean.token);

            if (!factory)
                throw new Error(`Factory not found: ${bean.target.toString()}`);

            Container.register(bean.token, factory, bean.scope);

            if (bean.stereoType === 'module') {
                const module = Container.get(bean.token) as Partial<MidnightModule>;
                await module.init?.();
            }
        }
    }
}