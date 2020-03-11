import * as vscode from 'vscode'
import { convertCssToJssString } from 'jss-codemorphs/convertCssToJss'

export function activate(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand(
    'extension.cssToJss',
    async (): Promise<void> => {
      const { window } = vscode
      const { activeTextEditor: editor } = window
      if (!editor) return

      const selectionStart = editor.document.offsetAt(editor.selection.start)
      const selectionEnd = editor.document.offsetAt(editor.selection.end)

      let code = editor.document.getText()
      if (selectionStart != selectionEnd) {
        code = code.substring(selectionStart, selectionEnd)
      }

      const { tabSize, insertSpaces } = editor.options
      // recast printing with custom tab format isn't reliable,
      // so just use spaces and then replace them with the editor setting
      let converted = convertCssToJssString(code, {
        tabWidth: 2,
        useTabs: false,
      })
      const tabChars = insertSpaces
        ? ' '.repeat(typeof tabSize === 'number' ? tabSize : 2)
        : '\t'
      converted = converted.replace(/^ */gm, match =>
        tabChars.repeat(match.length / 2)
      )

      const indentation = /^(\s*)\S/gm

      const firstLineBreak = /[\r\n]/.exec(code)

      let indent: string | null = null
      let match
      while ((match = indentation.exec(code))) {
        if (firstLineBreak && match.index < firstLineBreak.index) continue
        if (indent == null || match[1].length < indent.length) {
          indent = match[1]
        }
      }
      if (indent) {
        if (typeof insertSpaces === 'boolean' && typeof tabSize === 'number') {
          const tabChars = insertSpaces ? ' '.repeat(tabSize) : '\t'
          indent = indent.replace(new RegExp(`\t| {${tabSize}}`, 'g'), tabChars)
        }
        converted = converted.replace(/^/gm, indent)
      }
      const initialWhitespace = /^\s*/.exec(code)
      if (initialWhitespace) {
        converted = converted.replace(/^\s*/, initialWhitespace[0])
      }

      await editor.edit(edit => {
        edit.replace(editor.selection, converted)
      })
    }
  )

  context.subscriptions.push(disposable)
}

export function deactivate(): void {} // eslint-disable-line @typescript-eslint/no-empty-function
