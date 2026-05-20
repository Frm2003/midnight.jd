import type { BeanDefinition, Token } from "../types";

export default class BeanRegistry {
    private static beans = new Map<Token, BeanDefinition>();

    public static register(bean: BeanDefinition): void {
        this.beans.set(bean.token, bean);
    }

     public static registerAll(beans: Map<Token, BeanDefinition>): void {
        this.beans = new Map(beans);
    }

    public static get(token: Token): BeanDefinition {
        return this.beans.get(token)!;
    }

    public static getAll(): Map<Token, BeanDefinition> {
        return new Map(this.beans)!;
    }
}