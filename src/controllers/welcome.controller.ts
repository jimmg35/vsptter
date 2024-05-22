import { inject, injectable } from 'tsyringe'
import * as vscode from 'vscode'
import CredentialService from '../services/credential.service'
import StatusService from '../services/status.service'
import BaseController from './BaseController'

@injectable()
class WelcomeController extends BaseController {
  private credentialService: CredentialService
  private statusService: StatusService

  constructor(
    @inject('credentialService') credentialService: CredentialService,
    @inject('statusService') statusService: StatusService,
    @inject('vscodeContext') vscodeContext: vscode.ExtensionContext
  ) {
    super({ vscodeContext })
    this.credentialService = credentialService
    this.statusService = statusService
  }

  public async openLoginForm() {
    const username = await vscode.window.showInputBox({
      placeHolder: 'username'
    })
    if (!username) {
      vscode.window.showErrorMessage(
        '帳號不可為空(ﾒ ﾟ皿ﾟ)ﾒ',
        ...['知道了。･ﾟ･(つд`ﾟ)･ﾟ･']
      )
      return
    }
    const password = await vscode.window.showInputBox({
      placeHolder: 'password'
    })
    if (!password) {
      vscode.window.showErrorMessage(
        '密碼不可為空(ﾒ ﾟ皿ﾟ)ﾒ',
        ...['知道了。･ﾟ･(つд`ﾟ)･ﾟ･']
      )
      return
    }

    this.statusService.changeStatus('logging')
    const { isLoginSuccessed } = await this.credentialService.authenticate({
      username,
      password
    })

    if (isLoginSuccessed) {
      this.statusService.changeStatus('logged')
      vscode.window.showInformationMessage(
        '登入成功(ﾉ>ω<)ﾉ',
        ...['哦嗨喲(´・ω・｀)']
      )
      return
    }
    vscode.window.showErrorMessage(
      '登入失敗，帳密打錯了吧(´_ゝ`)',
      ...['哪尼Σ(;ﾟдﾟ)']
    )
  }

  public enterGeustMode() {}
}

export default WelcomeController
