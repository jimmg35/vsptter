import 'reflect-metadata';
import StateManager from './states';
import connect2Ptt from './ptt';
import * as vscode from 'vscode';
import { container } from 'tsyringe';

const bootstrap = async (context: vscode.ExtensionContext) => {
  const stateManager = new StateManager();
  const pttClient = await connect2Ptt({ stateManager });
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    1000,
  );
  container.register('stateManager', { useValue: stateManager });
  container.register('pttClient', { useValue: pttClient });
  container.register('statusBarItem', { useValue: statusBarItem });
  context.subscriptions.push(statusBarItem);
};

export default bootstrap;
