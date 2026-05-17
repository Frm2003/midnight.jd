import FileService from "./FileService";

import type { ModuleConstructor } from "../types";

export default class Loader {

    public static async loadImports(): Promise<ModuleConstructor[]> {
        const files: Set<string> = await FileService.scanDirs();

        const modules: ModuleConstructor[] = [];

        await Promise.all(
            [...files].map(async (file) => {
                try {
                    const mod = await import(file);

                    if (typeof mod.default === "function") {
                        modules.push(mod.default);
                    }
                } catch (err) {
                    console.error(`Fail loading module: ${file}`, err);
                }
            })
        );

        return modules;
    }
}