import 'reflect-metadata';
import * as vscode from 'vscode';
import bootstrap from './bootstrap';
import inject2Services from './inject';
import { container } from 'tsyringe';
import CredentialService from './services/credential.service';
import StatusService from './services/status.service';

(global as any).WebSocket = require('ws');

export async function activate(context: vscode.ExtensionContext) {
  // register service units.
  await bootstrap(context);

  // context.subscriptions.push(
  //   vscode.commands.registerCommand('vsptter.showLoginForm', async () => {
  //     credentialService.openLoginForm();
  //   }),
  // );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand('vsptter.enterGuestMode', () => {
  //     credentialService.enterGuestMode();
  //   }),
  // );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand('vsptter.refreshConnection', async () => {
  //     await bootstrap();
  //   }),
  // );
}

export function deactivate() {}
