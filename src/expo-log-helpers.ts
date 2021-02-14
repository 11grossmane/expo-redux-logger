let Logs: any = undefined;

//if there is an expo node module, we require it
try {
  Logs = require("expo").Logs;
} catch (e) {
  console.warn("no Expo project detected, will default to normal redux logger");
}

export const controlExpoLogging = (isRemoteDebuggingEnabled = false): void => {
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

export const disableCliLogging = (isRemoteDebuggingEnabled = false) => {
  if (Logs && isRemoteDebuggingEnabled) {
    Logs.disableExpoCliLogging();
  }
  return () => {};
};

export const enableCliLogging = () => {
  if (Logs) {
    return Logs.enableExpoCliLogging();
  }
  return () => {};
};
