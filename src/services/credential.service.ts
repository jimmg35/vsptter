import * as vscode from 'vscode';
import Ptt from 'ptt-client/dist';
import stateManager from '../states';

class CredentialService {
  private pttClient: Ptt;

  constructor(pttClient: Ptt) {
    this.pttClient = pttClient;
  }

  async openLoginForm(statusBarItem: vscode.StatusBarItem) {
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

    stateManager.setState('username', username);
    stateManager.setState('password', password);

    await this.authenticate(
      stateManager.getState('username'),
      stateManager.getState('password'),
      statusBarItem,
    );
  }

  enterGuestMode(statusBarItem: vscode.StatusBarItem) {
    stateManager.setState('viewingMode', 'guest');
    statusBarItem.text = `👤 訪客模式`;
    statusBarItem.show();
  }

  async authenticate(
    username: string,
    password: string,
    statusBarItem: vscode.StatusBarItem,
  ) {
    const response = await this.pttClient.login(username, password, true);
    if (response) {
      stateManager.setState('viewingMode', 'logged');

      statusBarItem.text = `👤 鄉民 ${stateManager.getState('username')}`;
      statusBarItem.show();
      return;
    }
    vscode.window.showErrorMessage(
      '登入失敗，帳密打錯了吧(´_ゝ`)',
      ...['哪尼Σ(;ﾟдﾟ)'],
    );
  }
}

export default CredentialService;
