import 'reflect-metadata'
import * as vscode from 'vscode'
import bootstrap from './bootstrap'

;(global as any).WebSocket = require('ws')

export async function activate(context: vscode.ExtensionContext) {
  // register service units.
  await bootstrap(context)
}

export function deactivate() {}
