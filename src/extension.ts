import * as vscode from 'vscode'
import {
  parseYAMLtoJSON,
  generateMermaidSyntax
} from './gen-mermaid'
import {
  validateWorkflow
} from '@action-validator/core'

const firstLine = '```mermaid'
const lastLine = '```'

export async function activate (context: vscode.ExtensionContext): Promise<vscode.ExtensionContext> {
  console.log('Congratulations, your extension "actions-to-graph" is now active!')
  const userFriendlyErrorMessage = 'Content file is not a valid GitHub Actions workflow'
  const disposable = vscode.commands.registerCommand('actions-to-graph.generateGraph', async () => {
    const currentEditor = vscode.window.activeTextEditor
    let text = ''
    try {
      text = parseYAMLtoJSON(currentEditor?.document.getText() ?? '')
      if (text === '' || text === null) {
        throw new Error('The content of the file is empty')
      }
      if (typeof text !== 'object') {
        throw new Error('The content of the file is not a valid JSON')
      }
      const validWorkflow = validateWorkflow(currentEditor?.document.getText() ?? '')

      if (
        validWorkflow.errors !== null &&
        typeof validWorkflow.errors !== 'undefined' &&
        validWorkflow.errors.length > 0
      ) {
        throw new Error('File content is not a valid GitHub Actions workflow')
      }
    } catch (error) {
      console.error(error)
      await vscode.window.showErrorMessage(userFriendlyErrorMessage)
    }
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
