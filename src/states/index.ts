import * as vscode from 'vscode';
import {
  ServerConnectionStatus,
  StatusType,
  ViewingMode,
} from './types/credential';

type StateTypes = ServerConnectionStatus | string | ViewingMode;

export interface IState<T> {
  key: string;
  value: T;
}

export interface IAppSatate {
  serverConnectionStatus: IState<ServerConnectionStatus>;
  username: IState<string>;
  password: IState<string>;
  viewingMode: IState<ViewingMode>;
  statusType: IState<StatusType>;
}

class StateManager {
  private appStates: IAppSatate;

  constructor() {
    this.appStates = {
      serverConnectionStatus: {
        key: 'vsptter.serverConnectionStatus',
        value: 'connecting',
      },
      username: {
        key: 'vsptter.username',
        value: '',
      },
      password: {
        key: 'vsptter.password',
        value: '',
      },
      viewingMode: {
        key: 'vsptter.viewingMode',
        value: 'not-decided',
      },
      statusType: {
        key: 'vsptter.statusType',
        value: 'none',
      },
    };
    this.init();
  }

  setState<T extends StateTypes>(state: keyof IAppSatate, value: T) {
    vscode.commands.executeCommand(
      'setContext',
      this.appStates[state].key,
      value,
    );
    this.appStates[state].value = value;
  }

  getState(state: keyof IAppSatate) {
    return this.appStates[state].value;
  }

  init() {
    this.appStates.serverConnectionStatus.value = 'connecting';
    for (const state in this.appStates) {
      vscode.commands.executeCommand(
        'setContext',
        this.appStates[state as keyof IAppSatate].key,
        this.appStates[state as keyof IAppSatate].value,
      );
    }
  }
}

export default StateManager;
