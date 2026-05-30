import { METADATA_KEYS } from "../../metadatas/metadataKeys";
import Component from "../core/Component";

export default function Module(): ClassDecorator;
export default function Module(target: Function): void;

export default function Module(target?: Function) {
    const decorator: ClassDecorator = (target) => {
        Reflect.defineMetadata(METADATA_KEYS.STEREOTYPES, 'module', target);
        Component()(target);
    };

    if (target) {
        // uso: @Module
        return decorator(target);
    }

    // uso: @Module()
    return decorator;
}