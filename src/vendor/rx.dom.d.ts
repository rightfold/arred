declare module Rx.DOM {
    function fromWebSocket(url: string, protocol: any): Rx.Observable<{data: string}>;
}
