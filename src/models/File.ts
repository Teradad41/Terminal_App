import { NodeItem } from './NodeItem'

export class File extends NodeItem {
  textData: string
  constructor(name: string) {
    super(name, 'file')
    this.textData = ''
  }

  getTextData(): string {
    return this.textData
  }

  setTextData(textData: string): void {
    this.textData = textData
  }
}
