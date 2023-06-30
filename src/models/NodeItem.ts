export class NodeItem {
  protected name: string
  protected createdTime: string
  protected modifiedTime: string
  protected type: string
  protected parent: NodeItem | null
  protected children: NodeItem[] | null

  constructor(name: string, type: string) {
    this.name = name
    this.type = type
    this.createdTime = new Date().toLocaleString()
    this.modifiedTime = this.createdTime
    this.parent = null
    this.children = null
  }

  isRoot(): boolean {
    return this.parent === null
  }

  isFile(): boolean {
    return this.type === 'file'
  }

  isDir(): boolean {
    return this.type === 'dir'
  }

  hasChildren(): boolean {
    return this.children !== null
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

  getParent(): NodeItem | null {
    return this.parent
  }

  getChildren(): NodeItem[] | null {
    return this.children
  }

  getCreatedTime(): string {
    return this.createdTime
  }

  getModifiedTime(): string {
    return this.modifiedTime
  }

  setModifiedTime(modifiedTime: string): void {
    this.modifiedTime = modifiedTime
  }
}
