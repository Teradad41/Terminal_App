import { NodeItem } from './NodeItem'

export class Dir extends NodeItem {
  constructor(name: string) {
    super(name, 'dir')
  }
}
