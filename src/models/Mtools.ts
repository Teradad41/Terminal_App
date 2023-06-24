export class Mtools {
  static commandLineParser(CLIInputString: string): string[] {
    return CLIInputString.split(' ')
  }

  static appendEchoParagraph(outputDiv: HTMLDivElement, inputtextValue: string): void {
    outputDiv.innerHTML += `<p><span class="text-pink-500">$</span> ${inputtextValue}</p>`
  }

  static appendResultParagraph(outputDiv: HTMLDivElement, isValid: boolean, message: string): void {
    let promptName: string
    let promptColor: string

    if (isValid) {
      promptName = 'Mtools'
      promptColor = 'text-green-300'
    } else {
      promptName = 'MtoolsError'
      promptColor = 'text-red-500'
    }

    outputDiv.innerHTML += `
      <p class="pb-5">
        <span class="${promptColor}">${promptName}</span>: ${message}
      </p>
    `
  }

  static parsedArrayValidator(parsedStringInputArray: string[]): { isValid: boolean; errorMessage: string } {
    // 最初にすべてのコマンドのエラーをチェック
    let validatorResponse: { isValid: boolean; errorMessage: string } =
      Mtools.universalValidator(parsedStringInputArray)
    if (!validatorResponse['isValid']) return validatorResponse

    // 各コマンドに対して固有のエラーをチェック
    validatorResponse = Mtools.commandArgumentsValidator(parsedStringInputArray.slice(1, 3))
    if (!validatorResponse['isValid']) return validatorResponse

    return { isValid: true, errorMessage: '' }
  }

  private static universalValidator(parsedStringInputArray: string[]): { isValid: boolean; errorMessage: string } {
    const validCommandList: string[] = [
      'add',
      'subtract',
      'multiply',
      'divide',
      'exp',
      'log',
      'abs',
      'sqrt',
      'round',
      'ceil',
      'floor',
    ]

    if (parsedStringInputArray[0] !== 'Mtools') {
      return {
        isValid: false,
        errorMessage: `input must start with 'Mtools'`,
      }
    } else if (parsedStringInputArray.length !== 3) {
      return {
        isValid: false,
        errorMessage: `command line input must contain exactly 3 elements: 'packageName commandName arguments'`,
      }
    } else if (!validCommandList.includes(parsedStringInputArray[1])) {
      return {
        isValid: false,
        errorMessage: `Mtools only supports the following commands: ${validCommandList.join(',')}`,
      }
    } else if (!Mtools.allStringElementsOfArrayContainNumbers(parsedStringInputArray[2].split(','))) {
      return {
        isValid: false,
        errorMessage: `last element of command line input should contain only numbers and commas`,
      }
    }

    return { isValid: true, errorMessage: '' }
  }

  private static commandArgumentsValidator(commandArgsArray: string[]): { isValid: boolean; errorMessage: string } {
    const singleArgumentCommands: string[] = ['abs', 'sqrt', 'ceil', 'round', 'floor']
    const doubleArgumentCommands: string[] = ['add', 'subtract', 'divide', 'multiply', 'exp', 'log']
    const command: string = commandArgsArray[0]
    const argsArr: number[] = commandArgsArray[1].split(',').map((element: string) => Number(element))

    if (singleArgumentCommands.includes(command)) {
      return Mtools.singleArgValidator(command, argsArr)
    }

    if (doubleArgumentCommands.includes(command)) {
      return Mtools.doubleArgValidator(command, argsArr)
    }

    return { isValid: true, errorMessage: '' }
  }

  // 3つ目の引数がすべて数字であるか調べる
  private static allStringElementsOfArrayContainNumbers(inputArr: string[]): boolean {
    const regex: RegExp = /^\d+$/
    return inputArr.every((element: string) => regex.test(element))
  }

  private static singleArgValidator(command: string, argsArr: number[]): { isValid: boolean; errorMessage: string } {
    if (argsArr.length !== 1) {
      return { isValid: false, errorMessage: `command ${command} requires exactly 1 argument` }
    } else if (command === 'sqrt' && argsArr[0] < 0) {
      return { isValid: false, errorMessage: `command ${command} only supports arguments with value >= 0` }
    }

    return { isValid: true, errorMessage: '' }
  }

  private static doubleArgValidator(command: string, argsArr: number[]): { isValid: boolean; errorMessage: string } {
    if (argsArr.length !== 2) {
      return { isValid: false, errorMessage: `command ${command} requires exactly 2 argument` }
    } else if (command === 'divide' && argsArr[1] === 0) {
      return { isValid: false, errorMessage: `command ${command} requires divisors != 0` }
    } else if (command === 'log' && (argsArr[1] <= 0 || argsArr[1] === 1)) {
      return { isValid: false, errorMessage: `command ${command} requires a base > 0 and not equal to 1` }
    }

    return { isValid: true, errorMessage: '' }
  }

  static evaluatedResultsStringFromParsedCLIArray(parsedStringInputArray: string[]): string {
    let result: number = 0
    const commandName: string = parsedStringInputArray[1]
    const argsArr: number[] = parsedStringInputArray[2].split(',').map((stringInput: string) => Number(stringInput))
    const arg1: number = argsArr[0]
    const arg2: number = argsArr[1]

    switch (commandName) {
      case 'add':
        result = arg1 + arg2
        break
      case 'subtract':
        result = arg1 - arg2
        break
      case 'multiply':
        result = arg1 * arg2
        break
      case 'divide':
        result = arg1 / arg2
        break
      case 'exp':
        result = Math.pow(arg1, arg2)
        break
      case 'log':
        result = Math.log(arg2) / Math.log(arg1)
        break
      case 'sqrt':
        result = Math.sqrt(arg1)
        break
      case 'abs':
        result = Math.abs(arg1)
        break
      case 'round':
        result = Math.round(arg1)
        break
      case 'ceil':
        result = Math.ceil(arg1)
        break
      case 'floor':
        result = Math.floor(arg1)
        break
      default:
        break
    }

    return 'Your result is: ' + result
  }
}
