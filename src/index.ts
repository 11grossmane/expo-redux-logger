import { Dispatch, AnyAction } from 'redux'
import { enableCliLogging, disableCliLogging } from './expo-log-helpers'

type MiddlewareReturn = (next: Dispatch<AnyAction>) => (action: any) => any
const colors = {
    white: '\x1b[0m',
    red: '\x1b[31m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    green: '\x1b[32m'
}

export function expoLogger({ getState }: any): MiddlewareReturn {
    const isRemoteDebuggingEnabled = typeof atob !== 'undefined'
    return (next: any) => (action: any) => {
        let labels = {
            beforeDispatch: colors.magenta + 'Before Dispatch: ' + colors.white,
            action: colors.cyan + 'Action: ' + colors.white,
            afterDispatch: colors.green + 'After Dispatch: ' + colors.white
        }

        //if remote debugging is enabled, disable cli logging only while this middleware is running
        //the result will be that we get normal log statements in our terminal
        //and remote debugger will get both redux logs and normal logs
        disableCliLogging(isRemoteDebuggingEnabled)
        console.log(labels.beforeDispatch, getState())
        console.log(labels.action, action)
        console.log(labels.afterDispatch, getState())
        //re-enabling after we have finished logging
        enableCliLogging()

        return next(action)
    }
}
