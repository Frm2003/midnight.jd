interface HttpRequest {
    body?: any;
    query?: Record<string, any>;
    path?: Record<string, any>;
    headers?: Record<string, string>;
}

export default HttpRequest;