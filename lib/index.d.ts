import { Dispatch, AnyAction } from 'redux';
declare type MiddlewareReturn = (next: Dispatch<AnyAction>) => (action: any) => any;
export declare function expoReduxLogger({ getState }: any): MiddlewareReturn;
export {};
