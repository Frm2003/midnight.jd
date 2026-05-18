import BeanFactory from "./BeanFactory";
import BeanScope from "./BeanScope";

interface Provider {
    factory: BeanFactory,
    scope: BeanScope,
}

export default Provider;