import type { BeanDefinition, ModuleConstructor } from "../types";

export default class BeanRegistry {
    private static beans = new Map<ModuleConstructor, BeanDefinition>();

    public static register(bean: BeanDefinition): void {
        this.beans.set(bean.token, bean);
    }

     public static registerAll(beans: Map<ModuleConstructor, BeanDefinition>): void {
        this.beans = new Map(beans);
    }

    public static get(token: ModuleConstructor): BeanDefinition {
        return this.beans.get(token)!;
    }

    public static getAll(): Map<ModuleConstructor, BeanDefinition> {
        return new Map(this.beans)!;
    }
}