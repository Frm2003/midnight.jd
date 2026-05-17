import { METADATA_KEYS } from "../../metadatas/metadataKeys";
import Component from "../core/Component";

export default function Service(): ClassDecorator;
export default function Service(target: Function): void;

export default function Service(target?: Function) {
    const decorator: ClassDecorator = (target) => {
        Reflect.defineMetadata(METADATA_KEYS.STEREOTYPES, 'service', target);
        Component()(target);
    };

    if (target) {
        // uso: @Controller
        return decorator(target);
    }

    // uso: @Controller()
    return decorator;
}