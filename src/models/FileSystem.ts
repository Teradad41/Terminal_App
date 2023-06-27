import { Dir } from './Dir'

export class FileSystem {
  rootDir: Dir
  currentDir: Dir
  constructor() {
    this.rootDir = new Dir('root')
    this.currentDir = this.rootDir
  }

  getCurrentDir(): Dir {
    return this.currentDir
  }

  pwd(): string {
    return 'command pwd'
  }

  ls() {}
}
