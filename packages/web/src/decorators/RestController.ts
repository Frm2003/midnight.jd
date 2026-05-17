import { Controller } from "@midnight.jd/core";
import { METADATA_KEYS } from "../metadatas/metadataKeys";

export default function RestController(): ClassDecorator;
export default function RestController(path: `/${string}`): ClassDecorator;

export default function RestController(path: string = '/'): ClassDecorator {
    return (target: Function) => {
        Reflect.defineMetadata(METADATA_KEYS.CLASS_ROUTE, path, target);
        Controller()(target);
    };
}