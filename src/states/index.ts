import * as vscode from "vscode";
import { ServerConnectionStatus } from "./types/credential";

type StateTypes = ServerConnectionStatus | string;

export interface IState<T> {
  key: string;
  value: T;
}

export interface IAppSatate {
  serverConnectionStatus: IState<ServerConnectionStatus>;
  username: IState<string>;
}

class StateManager {
  private appStates: IAppSatate = {
    serverConnectionStatus: {
      key: "vsptter.serverConnectionStatus",
      value: "connecting",
    },
    username: {
      key: "vsptter.username",
      value: "",
    },
  };
  private backupAppSatate: IAppSatate = { ...this.appStates };

  constructor() {
    this.init();
  }

  setState<T extends StateTypes>(state: keyof IAppSatate, value: T) {
    vscode.commands.executeCommand(
      "setContext",
      this.appStates[state].key,
      value
    );
    this.appStates[state].value = value;
  }

  getState(state: keyof IAppSatate) {
    return this.appStates[state].value;
  }

  init() {
    this.appStates = { ...this.backupAppSatate };
    for (const state in this.appStates) {
      vscode.commands.executeCommand(
        "setContext",
        this.appStates[state as keyof IAppSatate].key,
        this.appStates[state as keyof IAppSatate].value
      );
    }
  }
}

const stateManager = new StateManager();
export default stateManager;
