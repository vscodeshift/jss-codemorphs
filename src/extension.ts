import * as vscode from 'vscode'
import applyTransform from '@vscodeshift/apply-jscodeshift'

export function activate(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand('extension.cssToJss', () =>
    applyTransform(require('jss-codemorphs/css-to-jss'))
  )

  context.subscriptions.push(disposable)
}

export function deactivate(): void {} // eslint-disable-line @typescript-eslint/no-empty-function
