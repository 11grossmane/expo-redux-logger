"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logs = undefined;
//if there is an expo node module, we require it
try {
  Logs = require("expo").Logs;
} catch (e) {
  console.warn("no Expo project detected, will default to normal redux logger");
}
exports.controlExpoLogging = function (isRemoteDebuggingEnabled) {
  if (isRemoteDebuggingEnabled === void 0) {
    isRemoteDebuggingEnabled = false;
  }
  //if this is an a projet that contains, control cli logging, otherwise, return a function that does nothing
  if (Logs) {
    // https://stackoverflow.com/a/42839384/1123156
    if (isRemoteDebuggingEnabled) {
      Logs.disableExpoCliLogging();
    } else {
      Logs.enableExpoCliLogging();
    }
  }
};
exports.disableCliLogging = function (isRemoteDebuggingEnabled) {
  if (isRemoteDebuggingEnabled === void 0) {
    isRemoteDebuggingEnabled = false;
  }
  if (Logs && isRemoteDebuggingEnabled) {
    Logs.disableExpoCliLogging();
  }
  return function () {};
};
exports.enableCliLogging = function () {
  if (Logs) {
    return Logs.enableExpoCliLogging();
  }
  return function () {};
};
