import AnyController from "./AnyController";
import HttpMethod from "./HttpMethod";

interface RouteDefinition {
    path: string;
    httpMethod: HttpMethod;
    method: string | symbol;
    controller?: AnyController;
};

export default RouteDefinition;