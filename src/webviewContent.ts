//webview HTML content

export function webviewContent() {
  return /*html*/ `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style></style>
      </head>
      <body>
        <h3>Ollama Chat</h3>
        <textarea id="prompt" rows="3"></textarea>
        <button id="promptBtn">Ask</button>
        <div id="response"></div>
        <script>
          const vscode = acquireVsCodeApi();

          document.getElementById("promptBtn").addEventListener("click", () => {
            const prompt = document.getElementById("prompt").value;
            vscode.postMessage({
              command: "prompt",
              text: prompt,
            });
          });

          window.addEventListener("message", (event) => {
            const message = event.data;
            if (message.command === "chatResponse") {
              document.getElementById("response").innerText = message.text;
            }
          });
        </script>
      </body>
    </html>
  `;
}
