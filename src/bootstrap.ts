import StateManager from './units/states';
import connect2Ptt from './units/ptt';
import * as vscode from 'vscode';
import { container } from 'tsyringe';
import CredentialService from './services/credential.service';
import StatusService from './services/status.service';

const bootstrap = async (context: vscode.ExtensionContext) => {
  // instanciation of basic service units.
  const stateManager = new StateManager();
  const pttClient = await connect2Ptt({ stateManager });
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    1000,
  );

  // register basic service units.
  container.register('stateManager', { useValue: stateManager });
  container.register('pttClient', { useValue: pttClient });
  container.register('statusBarItem', { useValue: statusBarItem });
  context.subscriptions.push(statusBarItem);

  // resolve dependencies
  const credentialService = container.resolve(CredentialService);
  const statusService = container.resolve(StatusService);

  // register service units
  container.register('credentialService', { useValue: credentialService });
  container.register('statusService', { useValue: statusService });
};

export default bootstrap;
