import * as assert from 'assert'
import { before } from 'node:test'
import * as fs from 'fs'
import * as vscode from 'vscode'

// Paths to the files
const pathYamlBasic1: string = 'src/test/pool_examples/basic_1.yml'
const pathMdBasic1: string = 'src/test/pool_examples/basic_1.md'

const pathYamlBasic2: string = 'src/test/pool_examples/basic_2.yml'
const pathMdBasic2: string = 'src/test/pool_examples/basic_2.md'

const pathYamlBasic3: string = 'src/test/pool_examples/basic_3.yml'
const pathMdBasic3: string = 'src/test/pool_examples/basic_3.md'

// Read the files
const yamlBasic1 = fs.readFileSync(pathYamlBasic1, 'utf8')
const mdBasic1 = fs.readFileSync(pathMdBasic1, 'utf8')

const yamlBasic2 = fs.readFileSync(pathYamlBasic2, 'utf8')
const mdBasic2 = fs.readFileSync(pathMdBasic2, 'utf8')

const yamlBasic3 = fs.readFileSync(pathYamlBasic3, 'utf8')
const mdBasic3 = fs.readFileSync(pathMdBasic3, 'utf8')

const poolOfTests = [
  {
    yml: yamlBasic1,
    md: mdBasic1
  },
  {
    yml: yamlBasic2,
    md: mdBasic2
  },
  {
    yml: yamlBasic3,
    md: mdBasic3
  }
]

suite('Extension Test Suite', () => {
  before(async () => {
    await vscode.window.showInformationMessage('Start all tests.')
    const extension = vscode.extensions.getExtension('oscarBack.actions-to-graph')
    if (extension === null || extension === undefined) {
      throw new Error('Extension not found')
    }
    await extension.activate()
  })
  test('Pool of examples', async () => {
    for (const pool of poolOfTests) {
      const yamlEditor = await vscode.workspace.openTextDocument({
        content: pool.yml,
        language: 'yaml'
      })
      await vscode.window.showTextDocument(yamlEditor)
      await vscode.commands.executeCommand('actions-to-graph.generateGraph')
      const newEditor = vscode.window.activeTextEditor
      const newEditorContent = newEditor?.document.getText()
      assert.strictEqual(newEditorContent, pool.md)
      await vscode.commands.executeCommand('workbench.action.closeAllEditors')
    }
  })
})
