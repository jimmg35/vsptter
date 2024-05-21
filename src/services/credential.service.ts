import * as vscode from 'vscode';
import Ptt from 'ptt-client/dist';
import StateManager from '../states';
import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
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

  async openLoginForm() {
    const username = await vscode.window.showInputBox({
      placeHolder: 'username',
    });
    if (!username) {
      vscode.window.showErrorMessage(
        '帳號不可為空(ﾒ ﾟ皿ﾟ)ﾒ',
        ...['知道了。･ﾟ･(つд`ﾟ)･ﾟ･'],
      );
      return;
    }
    const password = await vscode.window.showInputBox({
      placeHolder: 'password',
    });
    if (!password) {
      vscode.window.showErrorMessage(
        '密碼不可為空(ﾒ ﾟ皿ﾟ)ﾒ',
        ...['知道了。･ﾟ･(つд`ﾟ)･ﾟ･'],
      );
      return;
    }

    this.stateManager.setState('username', username);
    this.stateManager.setState('password', password);

    await this.authenticate();
  }

  enterGuestMode() {
    this.stateManager.setState('viewingMode', 'guest');
    this.statusBarItem.text = `👤 訪客模式`;
    this.statusBarItem.show();
  }

  async authenticate() {
    const response = await this.pttClient.login(
      this.stateManager.getState('username'),
      this.stateManager.getState('password'),
      true,
    );
    if (response) {
      this.stateManager.setState('viewingMode', 'logged');

      this.statusBarItem.text = `👤 鄉民 ${this.stateManager.getState('username')}`;
      this.statusBarItem.show();
      return;
    }
    vscode.window.showErrorMessage(
      '登入失敗，帳密打錯了吧(´_ゝ`)',
      ...['哪尼Σ(;ﾟдﾟ)'],
    );
  }
}
