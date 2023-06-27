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
}
