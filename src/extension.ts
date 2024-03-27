import * as vscode from 'vscode';
import { parseYAMLtoJSON, generateMermaidSyntax } from './gen-mermaid';

const firstLine = '```mermaid';
const lastLine = '```';

export function writeFile(extension: string, path: string, content: string, nameOfFile: string) {
	const fs = require('fs');
	const pathFile = `${path}/${nameOfFile}.${extension}`;
	fs.writeFile(pathFile, content, (err: any) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log('File has been created');
	}
	);
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "actions-to-graph" is now active!');

	let disposable = vscode.commands.registerCommand('actions-to-graph.generateGraph', async () => {
		const currentEditor = vscode.window.activeTextEditor;
		const text = parseYAMLtoJSON(currentEditor?.document.getText() ?? '');
		const mermaidSyntax = generateMermaidSyntax(text);
		const mermaidFullContent = `${firstLine}\n${mermaidSyntax}\n${lastLine}`;
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

export function deactivate() {}
