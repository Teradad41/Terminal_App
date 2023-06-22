import '../style.css'

export class View {
  public static renderMainPage() {
    const app = document.querySelector<HTMLDivElement>('#app')
    if (!app) return

    app!.innerHTML = `
    <div class="h-screen flex justify-center items-center bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-600">
        <div class="flex flex-col justify-between bg-black w-2/3 h-4/5 pb-3 rounded-lg shadow-xl overflow-hidden">
            <div>
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
                <div id="terminalOutput" class="text-start my-4 py-3 px-6 space-y-1 overflow-y-scroll font-mono"></div>
            </div>
            <input id="terminalInput" class="bg-gray-700 rounded-lg px-4 py-2 mx-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500" type="text" placeholder="Type any command...">
        </div>
    </div>
    `
    const terminalInput = app.querySelector('#terminalInput') as HTMLInputElement
    const terminalOutput = app.querySelector('#terminalOutput') as HTMLDivElement
    const commandHistory: string[] = []
    let commandIndex: number = 0

    if (!terminalInput || !terminalOutput) return

    terminalInput.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'Enter':
          if (terminalInput.value !== '') {
            terminalOutput.innerHTML += `<p>\$ ${terminalInput.value}</p>`
            if (terminalInput.value !== commandHistory[commandHistory.length - 1]) {
              commandHistory.push(terminalInput.value)
            }
          }
          terminalInput.value = ''
          commandIndex = 0
          event.preventDefault()
          break
        case 'ArrowUp':
          if (commandIndex < commandHistory.length) {
            commandIndex++
            terminalInput.value = commandHistory[commandHistory.length - commandIndex] || ''
            event.preventDefault()
          }
          break
        case 'ArrowDown':
          if (commandIndex > 1) {
            commandIndex--
            terminalInput.value = commandHistory[commandHistory.length - commandIndex] || ''
            event.preventDefault()
          } else {
            commandIndex = 0
            terminalInput.value = ''
          }
          break
        default:
          break
      }
    })

    // コマンドもしくはコントロール + K が押されたとき画面をクリアする
    terminalInput.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        terminalOutput.innerHTML = '';
      }
    })
  }
}
