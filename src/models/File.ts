import { NodeItem } from './NodeItem'

export class File extends NodeItem {
  textContent: string
  constructor(name: string) {
    super(name, 'file')
    this.textContent = ''
  }

  getTextContent(): string {
    return this.textContent
  }

  setTextContent(textContent: string): void {
    this.textContent = textContent
  }
}
