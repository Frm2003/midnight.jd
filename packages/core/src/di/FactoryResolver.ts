import type { BeanDefinition, BeanFactory, Token } from "../types";

export default class FactoryResolver {
    private static factories = new Map<Token, BeanFactory>();

    public static resolve(beans: Map<Token, BeanDefinition>) {
        for (const bean of beans.values()) {
            this.resolveBean(bean, beans);
        }

        return this.factories;
    }

    private static resolveBean(bean: BeanDefinition, beans: Map<Token, BeanDefinition>) {
        if (this.factories.has(bean.token))
            return this.factories.get(bean.token)!;

        const deps = bean.dependencies.map(depToken => {
            const depBean = beans.get(depToken);

            if (!depBean)
                throw new Error(`Dep not found: ${depToken.toString()}`);

            return this.resolveBean(depBean, beans);
        });

        const factory = () => {
            const resolvedDeps = deps.map(f => f());
            return new bean.target(...resolvedDeps);
        };

        this.factories.set(bean.token, factory);

        return factory;
    }
}