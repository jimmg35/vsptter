import * as vscode from "vscode";
import bootstrap from "./bootstrap";
import stateManager from "./states";
import CredentialService from "./services/credential.service";

(global as any).WebSocket = require("ws");

export async function activate(context: vscode.ExtensionContext) {
  const pttClient = await bootstrap();

  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    1000
  );
  context.subscriptions.push(statusBarItem);

  if (pttClient) {
    const credentialService = new CredentialService(pttClient);

    context.subscriptions.push(
      vscode.commands.registerCommand("vsptter.showLoginForm", async () => {
        credentialService.openLoginForm(statusBarItem);
      })
    );

    context.subscriptions.push(
      vscode.commands.registerCommand("vsptter.enterGuestMode", () => {
        credentialService.enterGuestMode(statusBarItem);
      })
    );

    context.subscriptions.push(
      vscode.commands.registerCommand("vsptter.refreshConnection", async () => {
        await bootstrap();
      })
    );
  }
}

export function deactivate() {}
