export default class Container {
    private static instances: Map<ModuleConstructor, any> = new Map();
    private static factories: Map<ModuleConstructor, () => any> = new Map();
    private static scopes = new Map<ModuleConstructor, BeanScope>();

    public static register(
        token: ModuleConstructor,
        factory: BeanFactory,
        scope: BeanScope
    ) {
        this.factories.set(token, factory);
        this.scopes.set(token, scope);
    }

    public static get<T>(token: ModuleConstructor): T {
        const scope = this.scopes.get(token)!;
        const factory = this.factories.get(token)!;

        if (scope === "singleton") {
            if (this.instances.has(token))
                return this.instances.get(token);

            const instance = factory();
            this.instances.set(token, instance);

            return instance;
        }

        return factory();
    }
}