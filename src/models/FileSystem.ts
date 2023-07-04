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

  ls() {
    return ''
  }

  touch() {
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
