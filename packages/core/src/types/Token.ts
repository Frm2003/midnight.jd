import ModuleConstructor from "./ModuleConstructor";

type Token<T = any> = symbol | ModuleConstructor<T>;

export default Token;