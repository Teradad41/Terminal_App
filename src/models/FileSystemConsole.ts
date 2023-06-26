export class FileSystemConsole {
  static commandLineParser(CLIInputString: string): string[] {
    return CLIInputString.trim().split(' ')
  }

  static appendEchoParagraph(outputDiv: HTMLDivElement, inputtextValue: string): void {
    outputDiv.innerHTML += `<p><span class="text-pink-500">$</span> ${inputtextValue.trim()}</p>`
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
}
