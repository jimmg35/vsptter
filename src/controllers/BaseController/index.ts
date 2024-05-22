import * as vscode from 'vscode'

class BaseController {
  protected vscodeContext: vscode.ExtensionContext

  constructor({ vscodeContext }: { vscodeContext: vscode.ExtensionContext }) {
    this.vscodeContext = vscodeContext
    this.registerCommands()
  }

  private registerCommands() {
    setTimeout(() => {
      const methodNames = Object.getOwnPropertyNames(
        Object.getPrototypeOf(this)
      ).filter((name) => name !== 'constructor')

      methodNames.forEach((methodName, index) => {
        this.vscodeContext.subscriptions.push(
          vscode.commands.registerCommand(
            `vsptter.command.${methodName}`,
            async () => {
              // @ts-expect-error This is the best move I can do so far.
              this[methodNames[index]]()
            }
          )
        )
      })
    }, 1000)
  }
}

export default BaseController
