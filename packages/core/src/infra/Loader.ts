import FileService from "./FileService";

import type { ModuleConstructor } from "../types";

export default class Loader {

    public static async loadImports(): Promise<ModuleConstructor[]> {
        const localFiles = await FileService.scanDirs({
            dir: 'src'
        });

        const externalFiles = this.loadModulesImports();

        const files = new Set<string>([
            ...localFiles,
            ...externalFiles
        ]);

        const imports = await Promise.all(
            Array.from(files).map(this.importModule)
        );

        return imports.filter(Boolean) as ModuleConstructor[];
    }

    private static async importModule(
        file: string
    ): Promise<ModuleConstructor | null> {
        try {
            const mod = await import(file);

            if (typeof mod.default === 'function')
                return mod.default;

            if (typeof mod.Module === 'function')
                return mod.Module;

            return null;
        } catch (err) {
            console.error(`Fail loading module: ${file}`, err);
            return null;
        }
    }

    private static loadModulesImports(): Set<string> {
        const files = new Set<string>();

        const candidates: string[] = [
            '@midnight-jd/web'
        ]

        for (const candidate of candidates) {
            try {
                files.add(require.resolve(candidate));
            } catch (ignored) {
                // pacote não instalado
            }
        }

        return files;
    }
}