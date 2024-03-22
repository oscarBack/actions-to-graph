// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const firstLine = '```mermaid';
const lastLine = '```';
const mermaidDefaultGraph = `graph TD
	A[Christmas] -->|Get money| B(Go shopping)
	B --> C{Let me think}
	C -->|One| D[Laptop]
	C -->|Two| E[iPhone]
	C -->|Three| F[fa:fa-car Car]`;

const mermaidFullContent = `${firstLine}
${mermaidDefaultGraph}
${lastLine}`;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "actions-to-graph" is now active!');

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('actions-to-graph.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from actions-to-graph!');
	// });

	// context.subscriptions.push(disposable);

	let disposable = vscode.commands.registerCommand('actions-to-graph.helloWorld', async () => {
    const fileUri = vscode.Uri.parse('untitled:graph.md');
    const doc = await vscode.workspace.openTextDocument(fileUri);
		const editor = await vscode.window.showTextDocument(doc);

    editor.edit(editBuilder => {
        editBuilder.insert(new vscode.Position(0, 0), mermaidFullContent);
    });
    await vscode.window.showTextDocument(doc);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
