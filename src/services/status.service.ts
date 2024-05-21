import * as vscode from 'vscode';
import { StatusType, StatusTypeMap } from '../states/types/credential';
import StateManager from '../states';
import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
export default class StatusService {
  private statusBarItem: vscode.StatusBarItem;
  private stateManager: StateManager;

  constructor(
    @inject('statusBarItem') statusBarItem: vscode.StatusBarItem,
    @inject('stateManager') stateManager: StateManager,
  ) {
    this.stateManager = stateManager;
    this.statusBarItem = statusBarItem;
    this.statusBarItem.show();
  }

  changeStatus(status: StatusType) {
    this.statusBarItem.text = StatusTypeMap[status];
    this.stateManager.setState('statusType', status);
  }
}
