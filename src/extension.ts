import * as vscode from 'vscode'
import {
  parseYAMLtoJSON,
  generateMermaidSyntax
} from './gen-mermaid'

const firstLine = '```mermaid'
const lastLine = '```'

export async function activate (context: vscode.ExtensionContext): Promise<vscode.ExtensionContext> {
  console.log('Congratulations, your extension "actions-to-graph" is now active!')

  const disposable = vscode.commands.registerCommand('actions-to-graph.generateGraph', async () => {
    const currentEditor = vscode.window.activeTextEditor
    const text = parseYAMLtoJSON(currentEditor?.document.getText() ?? '')
    const mermaidSyntax = generateMermaidSyntax(text)
    const mermaidFullContent = `${firstLine}\n${mermaidSyntax}\n${lastLine}`
    const fileUri = vscode.Uri.parse('untitled:graph.md')
    const doc = await vscode.workspace.openTextDocument(fileUri)
    const editor = await vscode.window.showTextDocument(doc)

    await editor.edit(editBuilder => {
      editBuilder.insert(new vscode.Position(0, 0), mermaidFullContent)
    })
    await vscode.window.showTextDocument(doc)
  })

  context.subscriptions.push(disposable)
  return context
}

export function deactivate (): void {}
