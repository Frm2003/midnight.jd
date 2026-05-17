import type { Converter } from "./types";

export default class Conversor {
    private static converters: Map<any, Converter> = new Map();

    static {
        this.register(Number, value => {
            const num = Number(value);
            if (isNaN(num)) throw new Error(`Invalid number: ${value}`);
            return num;
        });
        this.register(String, value => String(value));
        this.register(Boolean, value => value === 'true' || value === true);
        this.register(Date, value => new Date(value));
    }

    public static has(type: any): boolean {
        return this.converters.has(type);
    }

    public static register(type: any, converter: Converter) {
        this.converters.set(type, converter);
    }

    public static convert<T>(value: any, type: new (...args: any[]) => T): T {
        if (this.converters.has(type)) {
            return this.converters.get(type)!(value);
        }

        if (typeof value === 'object' && value !== null) {
            return this.convertObject(value, type);
        }

        return value;
    }

    private static convertObject<T>(obj: any, cls: new () => any): T {
        const instance = new cls();

        for (const key of Object.keys(obj)) {
            const rawValue = obj[key];
            const propType = Reflect.getMetadata('design:type', instance, key);

            if (!propType) {
                (instance as any)[key] = rawValue;
                continue;
            }

            if (this.has(propType)) {
                (instance as any)[key] = this.convert(rawValue, propType);
            } else if (Array.isArray(rawValue)) {
                (instance as any)[key] = rawValue.map(item => this.convert(item, propType));
            } else if (typeof rawValue === 'object') {
                (instance as any)[key] = this.convert(rawValue, propType);
            } else {
                (instance as any)[key] = rawValue;
            }
        }

        return instance;
    }
}