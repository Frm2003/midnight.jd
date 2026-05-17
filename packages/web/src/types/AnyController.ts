type AnyController = {
    [key: string | symbol]: (...args: any[]) => any;
};

export default AnyController;