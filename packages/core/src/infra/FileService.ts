import path from 'path';
import fs from 'fs/promises';

export default class FileService {

    public static async scanDirs(
        { dir = '', set = new Set<string>() }: { dir?: string; set?: Set<string> } = {}
    ): Promise<Set<string>> {
        const realPath = path.resolve(process.cwd(), dir);

        const dirHandler = await fs.opendir(realPath);

        for await (const entry of dirHandler) {
            const fullPath = path.resolve(realPath, entry.name);

            if (entry.isDirectory()) {
                await this.scanDirs({ dir: fullPath, set });
                continue;
            }

            if (entry.isFile())
                set.add(fullPath);
        }

        return set;
    }
}