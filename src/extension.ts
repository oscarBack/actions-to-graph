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

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "actions-to-graph" is now active!');

	let disposable = vscode.commands.registerCommand('actions-to-graph.generateGraph', async () => {
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
