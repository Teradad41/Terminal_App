import { config } from '../config'
import { CommandLineInput } from '../config'
import { ValidatorResponse } from '../config'
import { FileSystem } from './FileSystem'

export class FileSystemConsole {
  static commandLineParser(cliInputString: string): CommandLineInput {
    const preParsedInputArray: string[] = cliInputString.trim().split(/\s+/)
    const command: string = preParsedInputArray[0]
    const commandOption: string[] = []
    const args: string[] = []

    preParsedInputArray.slice(1).forEach((element: string) => {
      if (element.charAt(0) === '-') {
        for (let i = 1; i < element.length; i++) {
          commandOption.push(element.charAt(i))
        }
      } else {
        args.push(element)
      }
    })

    return { command, commandOption, args }
  }

  static parsedArrayValidator(parsedStringInputObj: CommandLineInput): ValidatorResponse {
    // 最初にすべてのコマンドのエラーをチェック
    let validatorResponse: ValidatorResponse = FileSystemConsole.universalValidator(parsedStringInputObj)
    if (!validatorResponse['isValid']) return validatorResponse

    // 各コマンドに対して固有のエラーをチェック
    validatorResponse = FileSystemConsole.commandArgumentsValidator(parsedStringInputObj)
    if (!validatorResponse['isValid']) return validatorResponse

    return { isValid: true, errorMessage: '' }
  }

  private static universalValidator(parsedStringInputObj: CommandLineInput): ValidatorResponse {
    if (!config.commands.includes(parsedStringInputObj.command)) {
      return { isValid: false, errorMessage: `unsupported command ${parsedStringInputObj.command}` }
    }

    return { isValid: true, errorMessage: '' }
  }

  private static commandArgumentsValidator(parsedStringInputObj: CommandLineInput): ValidatorResponse {
    if (config.noOptionCommands.includes(parsedStringInputObj.command)) {
      if (parsedStringInputObj.commandOption.length !== 0) {
        return { isValid: false, errorMessage: `command ${parsedStringInputObj.command} does not take options` }
      }
    }

    if (config.noArgumentCommands.includes(parsedStringInputObj.command)) {
      if (parsedStringInputObj.args.length !== 0) {
        return {
          isValid: false,
          errorMessage: `commands ${parsedStringInputObj.command} does not take arguments`,
        }
      }
    }

    if (config.singleArgumentCommands.includes(parsedStringInputObj.command)) {
      if (parsedStringInputObj.args.length !== 1) {
        return {
          isValid: false,
          errorMessage: `command ${parsedStringInputObj.command} requires exactly 1 argument`,
        }
      }
    }

    return { isValid: true, errorMessage: '' }
  }

  static evaluatedResultsStringFromParsedCLIObj(parsedStringInputObj: CommandLineInput, fs: FileSystem): string {
    const command: string = parsedStringInputObj.command
    let res: string = ''

    switch (command) {
      case 'pwd':
        res = fs.pwd()
        break
      default:
        break
    }

    return res
  }

  static appendEchoParagraph(outputDiv: HTMLDivElement, inputtextValue: string): void {
    outputDiv.innerHTML += `<p><span class="text-green-600">$</span> ${inputtextValue.trim()}</p>`
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
}
