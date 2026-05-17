interface MidnightModule {
    name: string;
    dependencies?: string[];
    init(...args: any): Promise<void> | void;
}

export default MidnightModule;