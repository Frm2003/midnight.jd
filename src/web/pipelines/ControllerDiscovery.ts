import BeanRegistry from "../../core/di/BeanRegistry";
import Container from "../../core/di/Container";

export default class ControllerDiscovery {
    public static resolve() {
        const controllers = [];

        const beans = BeanRegistry.getAll();

        for (const bean of beans.values()) {
            if (bean.stereoType != 'controller') continue;
            controllers.push(Container.get(bean.target));
        }

        return controllers;
    }
}