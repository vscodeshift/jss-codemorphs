// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode'
import { expect } from 'chai'

suite('Extension Test Suite', () => {
  test('extension.cssToJss command', async function() {
    const document = await vscode.workspace.openTextDocument(
      vscode.Uri.parse('untitled:test.js')
    )
    const editor = await vscode.window.showTextDocument(document)
    editor.options.tabSize = 2
    editor.options.insertSpaces = true
    await editor.edit(edit =>
      edit.insert(
        document.positionAt(0),
        `{
  body {
    margin: 0;
    overflow: hidden;
    display: flex;
    height: 100vh;
    background: black;
  }
}
`
      )
    )
    editor.selection = new vscode.Selection(
      new vscode.Position(1, 2),
      new vscode.Position(7, 3)
    )
    await vscode.commands.executeCommand('extension.cssToJss')

    expect(document.getText()).to.equal(`{
  '@global': {
    body: {
      margin: '0',
      overflow: 'hidden',
      display: 'flex',
      height: '100vh',
      background: 'black'
    }
  },
}
`)
  })
})
