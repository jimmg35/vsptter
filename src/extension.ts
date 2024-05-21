import * as vscode from "vscode";
import bootstrap from "./bootstrap";

(global as any).WebSocket = require("ws");

export async function activate(context: vscode.ExtensionContext) {
  const pttClient = await bootstrap();

  // ptt.once("connect", () => {
  //   console.log("connected");
  //   vscode.commands.executeCommand(
  //     "setContext",
  //     "vsptter.isServerConnected",
  //     true
  //   );
  // });

  context.subscriptions.push(
    vscode.commands.registerCommand("vsptter.showLoginForm", () => {
      console.log("showLoginForm");
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
    })
  );
}

export function deactivate() {}
