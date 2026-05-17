import { METADATA_KEYS } from "../../metadatas/metadataKeys";
import Component from "../core/Component";

export default function Controller(): ClassDecorator;
export default function Controller(target: Function): void;

export default function Controller(target?: Function) {
    const decorator: ClassDecorator = (target) => {
        Reflect.defineMetadata(METADATA_KEYS.STEREOTYPES, 'controller', target);
        Component()(target);
    };

    if (target) {
        // uso: @Controller
        return decorator(target);
    }

    // uso: @Controller()
    return decorator;
}