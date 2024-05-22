import * as vscode from 'vscode';
import Ptt from 'ptt-client/dist';
import StateManager from '../units/states';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CredentialService {
  private pttClient: Ptt;
  private stateManager: StateManager;
  private statusBarItem: vscode.StatusBarItem;

  constructor(
    @inject('pttClient') pttClient: Ptt,
    @inject('stateManager') stateManager: StateManager,
    @inject('statusBarItem') statusBarItem: vscode.StatusBarItem,
  ) {
    this.pttClient = pttClient;
    this.stateManager = stateManager;
    this.statusBarItem = statusBarItem;
  }

  enterGuestMode() {
    this.stateManager.setState('viewingMode', 'guest');
    this.statusBarItem.text = `👤 訪客模式`;
    this.statusBarItem.show();
  }

  async authenticate({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const isLoginSuccessed = await this.pttClient.login(
      username,
      password,
      true,
    );

    if (isLoginSuccessed) {
      this.stateManager.setState('username', username);
      this.stateManager.setState('password', password);
      this.stateManager.setState('viewingMode', 'logged');
    } else {
      this.stateManager.setState('username', '');
      this.stateManager.setState('password', '');
      this.stateManager.setState('viewingMode', 'not-decided');
    }
    return { isLoginSuccessed };
    // if (response) {
    // this.stateManager.setState('viewingMode', 'logged');
    // this.statusBarItem.text = `👤 鄉民 ${this.stateManager.getState('username')}`;
    // this.statusBarItem.show();
    //   return;
    // }
    // vscode.window.showErrorMessage(
    //   '登入失敗，帳密打錯了吧(´_ゝ`)',
    //   ...['哪尼Σ(;ﾟдﾟ)'],
    // );
  }
}
