import { commands } from '../config'

export class FileSystemConsole {
  static commandLineParser(CLIInputString: string): { command: string; commandOption: string[]; args: string[] } {
    const preParsedInputArray: string[] = CLIInputString.trim().split(' ')
    const command: string = preParsedInputArray[0]
    let commandOption: string[] = []
    let args: string[] = []

    preParsedInputArray.slice(1).forEach((element: string) => {
      if (element.charAt(0) === '-') {
        for (let i = 1; i < element.length; i++) {
          commandOption.push(element.charAt(i))
        }
      } else {
        args.push(element)
      }
    })

    return { command: command, commandOption: commandOption, args: args }
  }

  static appendEchoParagraph(outputDiv: HTMLDivElement, inputtextValue: string): void {
    outputDiv.innerHTML += `<p><span class="text-pink-500">$</span> ${inputtextValue.trim()}</p>`
  }

  static appendResultParagraph(outputDiv: HTMLDivElement, isValid: boolean, message: string): void {
    let promptName: string
    let promptColor: string

    if (isValid) {
      promptName = ''
      promptColor = 'text-green-300'
    } else {
      promptName = 'Error'
      promptColor = 'text-red-500'
    }

    outputDiv.innerHTML += `
      <p class="pb-5">
        <span class="${promptColor}">${promptName}</span>: ${message}
      </p>
    `
  }

  // static parsedArrayValidator(parsedStringInputArray: string[]): { isValid: boolean; errorMessage: string } {
  // 最初にすべてのコマンドのエラーをチェック
  // let validatorResponse: { isValid: boolean; errorMessage: string } =
  // FileSystemConsole.universalValidator(parsedStringInputArray)
  // if (!validatorResponse['isValid']) return validatorResponse

  // 各コマンドに対して固有のエラーをチェック
  // validatorResponse = FileSystemConsole.commandArgumentsValidator(parsedStringInputArray.slice(1, 3))
  // if (!validatorResponse['isValid']) return validatorResponse

  // return { isValid: true, errorMessage: '' }
  // }

  private static universalValidator(): { isValid: boolean; errorMessage: string } {
    // if (!commands.includes(command))
    return { isValid: true, errorMessage: '' }
  }

  private static commandArgumentsValidator(): { isValid: boolean; errorMessage: string } {
    return { isValid: true, errorMessage: '' }
  }
}
