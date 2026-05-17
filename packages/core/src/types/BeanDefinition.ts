import BeanScope from "./BeanScope";
import ModuleConstructor from "./ModuleConstructor";

type BeanDefinition = {
    token: ModuleConstructor;
    target: ModuleConstructor;
    dependencies: ModuleConstructor[];
    scope: BeanScope;
    stereoType: string;
};

export default BeanDefinition;