import * as vscode from "vscode";
import { webviewContent } from "./webviewContent";
import ollama from "ollama";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "ollama-ext" is now active!');

  const disposable = vscode.commands.registerCommand(
    "ollama-ext.ollamaChat",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "ollamaChat",
        "Ollama Chat",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );

      panel.webview.html = webviewContent();
      panel.webview.onDidReceiveMessage(async (message: any) => {
        if (message.command === "prompt") {
          const userPrompt = message.text;

          let responseValue = "";
          try {
            const streamResponse = await ollama.chat({
              model: "llama3.2:latest",
              messages: [{ role: "user", content: userPrompt }],
              stream: true,
            });

            for await (const part of streamResponse) {
              responseValue += part.message.content;
              panel.webview.postMessage({
                command: "chatResponse",
                text: responseValue,
              });
            }
          } catch (err) {
            panel.webview.postMessage({
              command: "chatResponse",
              text: `Error:${String(err)}`,
            });
          }
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
