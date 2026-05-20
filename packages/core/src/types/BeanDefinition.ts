import BeanScope from "./BeanScope";
import ModuleConstructor from "./ModuleConstructor";
import Token from "./Token";

export interface BeanDefinition<T = any> {
    token: Token<T>;
    target: ModuleConstructor<T>;
    dependencies: Token[];
    scope: BeanScope;
    stereoType: string;
}

export default BeanDefinition;