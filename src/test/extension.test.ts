import * as assert from 'assert'

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode'
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
  // before(async () => {
  //   await vscode.window.showInformationMessage('Start all tests.')
  // })

  test('Sample test', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5))
    assert.strictEqual(-1, [1, 2, 3].indexOf(0))
  })
})

// Set a new test suite that open the editor and fill the content with a sample YAML
suite('Generate Graph Test Suite', () => {
  test('Generate Graph', async () => {
    const ymlContent = `
      name: Test
      on:
        push:
          branches:
            - master
      jobs:
        build:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v2
            - name: Run a one-line script
              run: echo Hello, world!
        tag:
          needs: build
          runs-on: ubuntu-latest
          steps:
            - name: Tag the commit
              run: echo "Tagging the commit"
        deploy:
          needs: tag
          runs-on: ubuntu-latest
          steps:
            - name: Deploy to production
              run: echo "Deploying to production"
    `
    const mdResultFirstLine = '```mermaid'

    const doc = await vscode.workspace.openTextDocument({
      content: ymlContent,
      language: 'yaml'
    })
    const editor = await vscode.window.showTextDocument(doc)
    // execute the command
    await vscode.commands.executeCommand('actions-to-graph.generateGraph')
    // get the content of the editor
    // const editorContent = editor.document.getText()

    // Get the content of the edito on the new file that was created
    const editorContent = vscode.window.activeTextEditor?.document.getText() ?? ''
    console.log(editorContent)
    // check if the first line is ```mermaid
    assert.strictEqual(editorContent.split('\n')[0], mdResultFirstLine)

    // compare if true is equal to true
    assert.strictEqual(true, true)
  }
  )
}
)
