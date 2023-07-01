import { Dir } from './Dir'
import { Help } from './Help'

export class FileSystem {
  rootDir: Dir
  currentDir: Dir
  constructor() {
    this.rootDir = new Dir('root')
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
