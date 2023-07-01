import { config } from '../config'
import { CommandLineInput } from '../config'
import { ValidatorResponse } from '../config'
import { FileSystem } from './FileSystem'
import { Help } from './Help'

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
    const command: string = parsedStringInputObj.command

    if (config.noOptionCommands.includes(command)) {
      if (parsedStringInputObj.commandOption.length !== 0) {
        return { isValid: false, errorMessage: `command ${command} does not take options` }
      }
    }

    if (config.noArgumentCommands.includes(command)) {
      if (parsedStringInputObj.args.length !== 0) {
        return {
          isValid: false,
          errorMessage: `commands ${command} does not take arguments`,
        }
      }
    }

    if (config.singleArgumentCommands.includes(command)) {
      if (parsedStringInputObj.args.length !== 1) {
        return {
          isValid: false,
          errorMessage: `command ${command} requires exactly 1 argument`,
        }
      }
    }

    return { isValid: true, errorMessage: '' }
  }

  static evaluatedResultsStringFromParsedCLIObj(parsedStringInputObj: CommandLineInput, fs: FileSystem): string {
    const command: string = parsedStringInputObj.command
    const args: string[] = parsedStringInputObj.args
    let res: string = ''

    switch (command) {
      case 'pwd':
        res = fs.pwd()
        break
      case 'help':
        if (args.length > 1) {
          res = `<p><span class="text-red-500">Error</span>: command [${command}] requires exactly 1 argument</p>`
        } else if (args.length === 0) {
          res = fs.help()
        } else if (args.length === 1) {
          res = Help.getCommandDescription(args[0])
        }
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
    const promptName: string = isValid ? '' : 'Error'
    const semi: string = isValid ? '' : ':'
    const promptColor: string = isValid ? 'text-green-400' : 'text-red-500'

    outputDiv.innerHTML += `
    <div class="pb-3">
      <span class="${promptColor}">${promptName}</span>${semi} ${message}
    </div>
  `
  }
}
