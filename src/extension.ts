import * as vscode from 'vscode';
import { parseYAMLtoJSON, generateMermaidSyntax } from './gen-mermaid';

const firstLine = '```mermaid';
const lastLine = '```';
// const mermaidDefaultGraph = `graph TD
// 	A[Christmas] -->|Get money| B(Go shopping)
// 	B --> C{Let me think}
// 	C -->|One| D[Laptop]
// 	C -->|Two| E[iPhone]
// 	C -->|Three| F[fa:fa-car Car]`;

// const mermaidFullContent = `${firstLine}
// ${mermaidDefaultGraph}
// ${lastLine}`;

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
		// TODO: read the current open file (.yml)
		const currentEditor = vscode.window.activeTextEditor;
		const text = parseYAMLtoJSON(currentEditor?.document.getText() ?? '');
		// console.log(currentEditor?.document.getText());
		// console.log(text);
		// TODO: generate mermaid syntax
		const mermaidSyntax = generateMermaidSyntax(text);
		// const mermaidSyntaxLastJumpLineDeleted = mermaidSyntax.substring(0, mermaidSyntax.length - 1);
		// console.log(mermaidSyntaxLastumpLineDeleted);
		const mermaidFullContent = `${firstLine}\n${mermaidSyntax}\n${lastLine}`;

		// console.log(mermaidSyntax);
		// TODO: generate a .md file named {currentFileName}-graph.md on the same folder
		
		// TODO: write the mermaid syntax to the .md file
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
