const vscode = require('vscode');
const { exec } = require('child_process');
const puppeteer = require('puppeteer');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "script-css-applier" is now active!');

	let disposable = vscode.commands.registerCommand('script-css-applier.helloWorld', function () {

		async function showDialogBox() {
			vscode.window.showInputBox({
				prompt: "Digite o site desejado",
				value: '',
			}).then(value => {
				vscode.window.showInformationMessage(`O valor digitado é ${value}`);
				// site = value;
				// exec(`start ${site}`);
				applyScript(value);
				vscode.window.showInformationMessage(`Applying your script into ${value})`);

			});
		}
		async function applyScript(site) {
			console.log("PASSOU 1");
			const browser = await puppeteer.launch({
				headless: false, // Define se o Chrome deve ser exibido em modo headless ou não
				defaultViewport: null, // Define o tamanho da viewport
				args: ['--start-maximized'], // Define argumentos adicionais do Chrome
				executablePath: `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe` // Define o caminho do executável do Chrome
			});
			console.log("PASSOU 2");
			// Cria uma nova página
			const page = await browser.newPage();
			console.log("PASSOU 3");
			// Navega para o site especificado
			await page.goto("http://www.google.com.br");
			// Espera até que a página esteja totalmente carregada
			// await page.waitForNavigation({ waitUntil: 'networkidle0' });
			// Executa um script em JavaScript na página
			// await page.evaluate(() => {
				// console.log('Executando um script na página');
				// Faça algo com o DOM da página
			// });
			// Fecha o navegador
			//   await browser.close();
		}

		// The code you place here will be executed every time your command is executed
		let site = null;
		// Display a message box to the user
		showDialogBox();



	});

	context.subscriptions.push(disposable);
}

// quando a extensão é desativada.
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
