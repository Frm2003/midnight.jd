import type { BeanDefinition } from "../types";

export default class BeanRegistry {
    private static beans = new Map<symbol, BeanDefinition>();

    public static register(bean: BeanDefinition): void {
        this.beans.set(bean.token, bean);
    }

     public static registerAll(beans: Map<symbol, BeanDefinition>): void {
        this.beans = new Map(beans);
    }

    public static get(token: symbol): BeanDefinition {
        return this.beans.get(token)!;
    }

    public static getAll(): Map<symbol, BeanDefinition> {
        return new Map(this.beans)!;
    }
}