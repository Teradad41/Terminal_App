export class CommandHistory {
  private commandHistory: string[]
  private commandIndex: number
  constructor() {
    this.commandHistory = []
    this.commandIndex = 0
  }

  push(inputValue: string): void {
    this.commandHistory.push(inputValue)
  }

  getLength(): number {
    return this.commandHistory.length
  }

  getCommandHistory(commandIndex: number): string {
    return this.commandHistory[commandIndex]
  }

  increment(): void {
    this.commandIndex++
  }

  decrement(): void {
    this.commandIndex--
  }

  getCommandIndex(): number {
    return this.commandIndex
  }

  setCommandIndex(commandIndex: number): void {
    this.commandIndex = commandIndex
  }
}
