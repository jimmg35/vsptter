import * as vscode from "vscode";
import bootstrap from "./bootstrap";
import stateManager from "./states";
import CredentialService from "./services/credential.service";

(global as any).WebSocket = require("ws");

export async function activate(context: vscode.ExtensionContext) {
  const pttClient = await bootstrap();
  if (pttClient) {
    const credentialService = new CredentialService(pttClient);

    context.subscriptions.push(
      vscode.commands.registerCommand("vsptter.showLoginForm", () => {
        stateManager.getState("username");

        credentialService.authenticate(
          stateManager.getState("username"),
          stateManager.getState("password")
        );
      })
    );

    context.subscriptions.push(
      vscode.commands.registerCommand("vsptter.enterGuestMode", () => {
        console.log("enterGuestMode");
      })
    );

    context.subscriptions.push(
      vscode.commands.registerCommand("vsptter.refreshConnection", async () => {
        console.log("refreshConnection");
        await bootstrap();
        // stateManager.init();
      })
    );
  }
}

export function deactivate() {}
