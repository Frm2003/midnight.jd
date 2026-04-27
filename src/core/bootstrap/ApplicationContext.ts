import Loader from "../../infra/Loader";
import BeanRegistry from "../di/BeanRegistry";
import BeanScanner from "../di/BeanScanner";
import Container from "../di/Container";
import FactoryResolver from "../di/FactoryResolver";

export default class ApplicationContext {

    public static async init() {
        const modules: ModuleConstructor[] = await Loader.loadImports();
        const beans: Map<ModuleConstructor, BeanDefinition> = BeanScanner.filterModules(modules);

        BeanRegistry.registerAll(beans);

        const factories = FactoryResolver.resolve(beans);

        for (const bean of beans.values()) {
            const factory = factories.get(bean.token);

            if (!factory)
                throw new Error(`Factory not found: ${bean.target.toString}`);

            Container.register(bean.token, factory, bean.scope);
        }
    }
}