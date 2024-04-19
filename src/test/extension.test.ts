import * as assert from 'assert'
import { before } from 'node:test'
import * as fs from 'fs'

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode'
// import * as myExtension from '../../extension';

const pathYamlBasic1: string = 'src/test/pool_examples/basic_1.yml'
const pathMdBasic1: string = 'src/test/pool_examples/basic_1.md'

const yamlBasic1 = fs.readFileSync(pathYamlBasic1, 'utf8')
const mdBasic1 = fs.readFileSync(pathMdBasic1, 'utf8')

suite('Extension Test Suite', () => {
  before(async () => {
    await vscode.window.showInformationMessage('Start all tests.')
    const extension = vscode.extensions.getExtension('oscarBack.actions-to-graph')
    if (extension === null || extension === undefined) {
      throw new Error('Extension not found')
    }
    await extension.activate()
  })
  test('Sample test', async () => {
    const yamlEditor = await vscode.workspace.openTextDocument({
      content: yamlBasic1,
      language: 'yaml'
    })
    // get the content of the yamlEditor
    const yamlEditorContent = yamlEditor.getText()
    // console.log('yamlEditorContent', yamlEditorContent)
    await vscode.window.showTextDocument(yamlEditor)
    await vscode.commands.executeCommand('actions-to-graph.generateGraph')
    // get the content of the new document opened
    const newEditor = vscode.window.activeTextEditor
    const newEditorContent = newEditor?.document.getText()
    console.log('newEditorContent', newEditorContent)
    // assert.strictEqual(newEditorContent, mdBasic1)
    assert.strictEqual([1, 2, 3].indexOf(5), -1)
    assert.strictEqual([1, 2, 3].indexOf(0), -1)
  })
})
