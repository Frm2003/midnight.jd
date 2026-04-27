import path from 'path';
import fs from 'fs/promises';

export default class FileService {
    private static dirPath = path.resolve(process.cwd(), 'src', 'example');

    public static async scanDirs(
        { dir = this.dirPath, set = new Set<string>() }: { dir?: string; set?: Set<string> } = {}
    ): Promise<Set<string>> {
        const dirHandler = await fs.opendir(dir);

        for await (const entry of dirHandler) {
            const fullPath: string = path.resolve(dir, entry.name);

            if (entry.isDirectory()) {
                await this.scanDirs({ dir: fullPath, set });
            }

            if (entry.isFile()) {
                set.add(fullPath);
            }
        }

        return set;
    }
}