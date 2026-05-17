import HttpServerAdapter from "./HttpServerAdapter";

interface MidnightModule {
    name: string;
    dependencies?: string[];
    init(httpServerAdapter: HttpServerAdapter): Promise<void> | void;
}

export default MidnightModule;