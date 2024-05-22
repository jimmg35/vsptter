import { container } from 'tsyringe'
import * as vscode from 'vscode'
import WelcomeController from './controllers/welcome.controller'
import CredentialService from './services/credential.service'
import StatusService from './services/status.service'
import connect2Ptt from './units/ptt'
import StateManager from './units/states'

const bootstrap = async (context: vscode.ExtensionContext) => {
  // instanciation of basic service units.
  const stateManager = new StateManager()
  const pttClient = await connect2Ptt({ stateManager })
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    1000
  )

  // register basic service units.
  container.register('stateManager', { useValue: stateManager })
  container.register('pttClient', { useValue: pttClient })
  container.register('statusBarItem', { useValue: statusBarItem })
  container.register('vscodeContext', { useValue: context })
  context.subscriptions.push(statusBarItem)

  // resolve dependencies of services
  const credentialService = container.resolve(CredentialService)
  const statusService = container.resolve(StatusService)

  // register service units
  container.register('credentialService', { useValue: credentialService })
  container.register('statusService', { useValue: statusService })

  // resolve dependencies of controllers
  container.resolve(WelcomeController)
}

export default bootstrap
