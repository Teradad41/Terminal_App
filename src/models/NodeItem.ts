export class NodeItem {
  private name: string
  private type: string
  private parent: NodeItem | null
  private childHead: NodeItem | null
  private nextSibling: NodeItem | null
  private content: string
  private modifiedTime: string

  constructor(name: string, type: string, parent: NodeItem | null = null, content: string = '') {
    this.name = name
    this.type = type
    this.parent = parent
    this.childHead = null
    this.nextSibling = null
    this.content = content
    this.modifiedTime = new Date().toLocaleString()
  }

  getName(): string {
    return this.name
  }

  setName(name: string): void {
    this.name = name
  }

  getType(): string {
    return this.type
  }

  isFile(): boolean {
    return this.type === 'file'
  }

  isDir(): boolean {
    return this.type === 'dir'
  }

  getParent(): NodeItem | null {
    return this.parent
  }

  isRoot(): boolean {
    return this.parent === null
  }

  getChildHead(): NodeItem | null {
    return this.childHead
  }

  hasChildren(): boolean {
    return this.childHead !== null
  }

  getModifiedTime(): string {
    return this.modifiedTime
  }

  setModifiedTime(modifiedTime: string): void {
    this.modifiedTime = modifiedTime
  }

  getContent(): string {
    return this.content
  }

  setContent(content: string): void {
    this.content = content
  }

  hasImmediateChildWithName(childName: string): boolean {
    let iterator: NodeItem | null = this.childHead
    while (iterator !== null) {
      if (iterator.getName() === childName) return true
      iterator = iterator.nextSibling
    }
    return false
  }

  getImmediateChildWithName(childName: string): NodeItem | null {
    let iterator: NodeItem | null = this.childHead
    while (iterator !== null) {
      if (iterator.getName() === childName) return iterator
      iterator = iterator.nextSibling
    }
    return null
  }

  getChildTail(): NodeItem | null {
    let iterator: NodeItem | null = this.childHead
    while (iterator!.nextSibling !== null) {
      iterator = iterator!.nextSibling
    }
    return iterator
  }
}
