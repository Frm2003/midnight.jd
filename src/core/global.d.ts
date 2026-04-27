export { };

declare global {
    type BeanScope = "singleton" | "transient"

    type ModuleConstructor<T = any> = new (...args: any[]) => T;

    type LoadedModule<T = any> = {
        default: ModuleConstructor<T>;
    };

    type BeanDefinition = {
        token: ModuleConstructor;
        target: ModuleConstructor;
        dependencies: ModuleConstructor[];
        scope: BeanScope;
        stereoType: string;
    };
}