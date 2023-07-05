import { Help } from './Help'
import { NodeItem } from './NodeItem'

export class FileSystem {
  rootDir: NodeItem
  currentDir: NodeItem
  constructor() {
    this.rootDir = new NodeItem('root', 'dir')
    this.currentDir = this.rootDir
  }

  pwd(): string {
    return this.currentDir.getFullPathToRootAsString()
  }

  ls(): string {
    return ''
  }

  touch(stringPath: string) {
    if (this.currentDir.hasImmediateChildWithName(stringPath)) {
      this.currentDir.getImmediateChildWithName(stringPath)?.setModifiedTime()
      return `1 file's date updated: ${stringPath} `
    }

    return ''
  }

  mkdir() {
    return ''
  }

  cd() {
    return ''
  }

  rm() {
    return ''
  }

  print() {
    return ''
  }

  setContent() {
    return ''
  }

  clear() {
    return ''
  }

  help(): string {
    return Help.getAllCommandHelp()
  }
}
