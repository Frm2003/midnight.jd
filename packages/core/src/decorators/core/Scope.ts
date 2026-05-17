import { METADATA_KEYS } from "../../metadatas/metadataKeys";

import type { BeanScope } from "../../types";

export default function Scope(value: BeanScope): ClassDecorator;
export default function Scope(value: BeanScope, target: Function): void;

export default function Scope(value: BeanScope, target?: Function) {
    const decorator = (target: Function) => {
        Reflect.defineMetadata(METADATA_KEYS.SCOPE, value, target);
    };

    if (target) {
        return decorator(target);
    }

    return decorator;
}