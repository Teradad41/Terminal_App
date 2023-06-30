import { Dir } from './Dir'

export class FileSystem {
  rootDir: Dir
  currentDir: Dir
  constructor() {
    this.rootDir = new Dir('root')
    this.currentDir = this.rootDir
  }

  getCurrentDir(): string {
    return "/"
  }

  pwd(): string {
    return '/'
  }

  ls() {}
}
