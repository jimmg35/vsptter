import 'reflect-metadata';
import * as vscode from 'vscode';
import bootstrap from './bootstrap';

(global as any).WebSocket = require('ws');

export async function activate(context: vscode.ExtensionContext) {
  // register service units.
  await bootstrap(context);

  // context.subscriptions.push(
  //   vscode.commands.registerCommand('vsptter.command.openLoginForm', async () => {
  //     credentialService.openLoginForm();
  //   }),
  // );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand('vsptter.command.enterGuestMode', () => {
  //     // credentialService.enterGuestMode();
  //   }),
  // );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand('vsptter.command.refreshConnection', async () => {
  //     await bootstrap();
  //   }),
  // );
}

export function deactivate() {}
