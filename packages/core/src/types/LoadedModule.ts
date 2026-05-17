import ModuleConstructor from "./ModuleConstructor";

type LoadedModule<T = any> = {
    default: ModuleConstructor<T>;
};

export default LoadedModule;