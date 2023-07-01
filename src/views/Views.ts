import '../style.css'
import { FileSystem } from '../models/FileSystem'
import { FileSystemConsole } from '../models/FileSystemConsole'
import { CommandHistory } from '../models/CommandHistory'

export class View {
  public static renderMainPage(fs: FileSystem, cmdHistory: CommandHistory) {
    const app = document.querySelector<HTMLDivElement>('#app')
    if (!app) return

    app!.innerHTML = `
    <div class="h-screen flex justify-center items-center bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600">
        <div class="flex flex-col justify-between bg-black w-2/3 h-[85%] rounded-xl shadow-xl overflow-hidden">
            <div class="h-[66rem]">
                <div class="flex justify-between items-center bg-gray-600 px-4 py-[0.3rem]">
                    <div class="flex justify-start items-center">
                        <div class="flex space-x-2">
                            <div class="w-3 h-3 bg-red-500 rounded-full cursor-pointer"></div>
                            <div class="w-3 h-3 bg-yellow-400 rounded-full cursor-pointer"></div>
                            <div class="w-3 h-3 bg-green-500 rounded-full cursor-pointer"></div>
                        </div>
                    </div>
                <p>Terminal</p>
                <div class="w-11"></div>
              </div>
              <div id="terminalOutput" class="text-start my-4 px-6 space-y-1 overflow-y-scroll text-lg font-mono h-[40rem]"></div>
            </div>
            <input id="terminalInput" class="bg-gray-700 rounded-lg px-4 py-2 mx-3 mb-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500" type="text" placeholder="Type any command...">
        </div>
    </div>
    `
    const terminalInput = app.querySelector('#terminalInput') as HTMLInputElement
    const terminalOutput = app.querySelector('#terminalOutput') as HTMLDivElement

    if (!terminalInput || !terminalOutput) return

    terminalInput.addEventListener('keyup', (event) => submitCliInput(event))

    function submitCliInput(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowUp':
          if (cmdHistory.getCommandIndex() < cmdHistory.getLength()) {
            cmdHistory.increment()
            terminalInput.value =
              cmdHistory.getCommandHistory(cmdHistory.getLength() - cmdHistory.getCommandIndex()) || ''
            event.preventDefault()
          }
          break
        case 'ArrowDown':
          if (cmdHistory.getCommandIndex() > 1) {
            cmdHistory.decrement()
            terminalInput.value =
              cmdHistory.getCommandHistory(cmdHistory.getLength() - cmdHistory.getCommandIndex()) || ''
            event.preventDefault()
          } else {
            cmdHistory.setCommandIndex(0)
            terminalInput.value = ''
          }
          break
        case 'Enter':
          if (terminalInput.value !== '') {
            FileSystemConsole.appendEchoParagraph(terminalOutput, terminalInput.value)

            if (terminalInput.value !== cmdHistory.getCommandHistory(cmdHistory.getLength() - 1)) {
              cmdHistory.push(terminalInput.value)
            }

            const parsedStringInputObj = FileSystemConsole.commandLineParser(terminalInput.value)
            const validatorResponse = FileSystemConsole.parsedArrayValidator(parsedStringInputObj)

            if (!validatorResponse['isValid']) {
              FileSystemConsole.appendResultParagraph(terminalOutput, false, validatorResponse['errorMessage'])
            } else {
              const res: string = FileSystemConsole.evaluatedResultsStringFromParsedCLIObj(parsedStringInputObj, fs)
              FileSystemConsole.appendResultParagraph(terminalOutput, true, res)
            }
          } else {
            FileSystemConsole.appendEchoParagraph(terminalOutput, terminalInput.value)
          }
          terminalInput.value = ''
          cmdHistory.setCommandIndex(0)
          event.preventDefault()
          break
        default:
          break
      }
    }

    // コマンドもしくはコントロール + K が押されたとき画面をクリアする
    terminalInput.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        terminalOutput.innerHTML = ''
      }
    })

    // 要素が追加された後に自動スクロールを実行する
    terminalOutput.addEventListener('DOMNodeInserted', () => {
      terminalOutput.scrollTop = terminalOutput.scrollHeight
    })
  }
}
