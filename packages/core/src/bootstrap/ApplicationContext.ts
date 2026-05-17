import "reflect-metadata";

export default class ApplicationContext {

    public static async init(modules: any[]) {
        for (const module of modules) {
            await module.init();
        }
    }
}