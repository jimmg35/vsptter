import 'reflect-metadata';
import * as vscode from 'vscode';
import connect2Ptt from './ptt';
import CredentialService from './services/credential.service';
import StatusService from './services/status.service';
import StateManager from './states';
import { container } from 'tsyringe';
import bootstrap from './bootstrap';
import inject2Services from './inject';

(global as any).WebSocket = require('ws');

export async function activate(context: vscode.ExtensionContext) {
  // register basic service units.
  await bootstrap(context);

  // resolve service dependencies.
  // const { credentialService, statusService } =
  inject2Services();

  // const credentialService = new CredentialService({
  //   pttClient,
  //   stateManager,
  // });
  // const statusService = new StatusService(statusBarItem);

  context.subscriptions.push(
    vscode.commands.registerCommand('vsptter.showLoginForm', async () => {
      // credentialService.openLoginForm();
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vsptter.enterGuestMode', () => {
      // credentialService.enterGuestMode();
    }),
  );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand('vsptter.refreshConnection', async () => {
  //     await bootstrap();
  //   }),
  // );
}

export function deactivate() {}
