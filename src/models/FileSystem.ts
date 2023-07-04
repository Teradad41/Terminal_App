import { Help } from './Help'
import { NodeItem } from './NodeItem'

export class FileSystem {
  rootDir: NodeItem
  currentDir: NodeItem
  constructor() {
    this.rootDir = new NodeItem('root', 'dir')
    this.currentDir = this.rootDir
  }

  getCurrentDir(): string {
    return '/home'
  }

  pwd(): string {
    return ''
  }

  ls() {}

  touch() {}

  mkdir() {}

  cd() {}

  rm() {}

  print() {}

  setContent() {}

  clear() {}

  help(): string {
    return Help.getAllCommandHelp()
  }
}
