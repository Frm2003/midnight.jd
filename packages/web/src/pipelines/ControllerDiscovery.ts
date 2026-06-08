import { BeanRegistry, Container } from "@midnightjd/core";

export default class ControllerDiscovery {
    public static resolve() {
        const controllers = [];

        const beans = BeanRegistry.getAll();

        for (const bean of beans.values()) {
            if (bean.stereoType != 'controller') continue;
            controllers.push(Container.get(bean.token));
        }

        return controllers;
    }
}