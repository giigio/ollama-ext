import * as vscode from "vscode";
import ollama from "ollama";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "ollama-ext" is now active!');

  const disposable = vscode.commands.registerCommand(
    "ollama-ext.ollamaChat",
    () => {
      vscode.window.showInformationMessage("Hello Ollama!");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
