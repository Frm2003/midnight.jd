type ModuleConstructor<T = any> = new (...args: any[]) => T;

export default ModuleConstructor;