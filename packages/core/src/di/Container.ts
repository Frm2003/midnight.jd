import type { BeanFactory, BeanScope, Provider } from "../types";

export default class Container {
    private static providers: Map<symbol, Provider> = new Map();
    private static instances: Map<symbol, any> = new Map();

    public static register(
        token: symbol,
        factory: BeanFactory,
        scope: BeanScope
    ) {
        this.providers.set(token, { factory, scope });
    }

    public static get<T>(token: symbol): T {
        const { factory, scope } = this.providers.get(token)!;

        if (scope === "singleton") {
            if (this.instances.has(token))
                return this.instances.get(token)!;

            const instance = factory();
            this.instances.set(token, instance);

            return instance;
        }

        return factory();
    }
}