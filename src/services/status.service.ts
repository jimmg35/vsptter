import * as vscode from 'vscode';
import { StatusType, StatusTypeMap } from '../units/states/types/credential';
import StateManager from '../units/states';
import { inject, injectable } from 'tsyringe';

@injectable()
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
