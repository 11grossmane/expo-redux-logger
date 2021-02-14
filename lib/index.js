"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expoReduxLogger = void 0;
var expo_log_helpers_1 = require("./expo-log-helpers");
var colors = {
    white: '\x1b[0m',
    red: '\x1b[31m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    green: '\x1b[32m'
};
function expoReduxLogger(_a) {
    var getState = _a.getState;
    var isRemoteDebuggingEnabled = typeof atob !== 'undefined';
    return function (next) { return function (action) {
        var labels = {
            beforeDispatch: colors.magenta + 'Before Dispatch: ' + colors.white,
            action: colors.cyan + 'Action: ' + colors.white,
            afterDispatch: colors.green + 'After Dispatch: ' + colors.white
        };
        //if remote debugging is enabled, disable cli logging only while this middleware is running
        //the result will be that we get normal log statements in our terminal
        //and remote debugger will get both redux logs and normal logs
        expo_log_helpers_1.disableCliLogging(isRemoteDebuggingEnabled);
        console.log(labels.beforeDispatch, getState());
        console.log(labels.action, action);
        console.log(labels.afterDispatch, getState());
        //re-enabling after we have finished logging
        expo_log_helpers_1.enableCliLogging();
        return next(action);
    }; };
}
exports.expoReduxLogger = expoReduxLogger;
