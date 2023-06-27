import { View } from '../views/Views'
import { FileSystem } from '../models/FileSystem'
import { CommandHistory } from '../models/CommandHistory'

export class Controller {
  public static startApp() {
    const fs: FileSystem = new FileSystem()
    const cmdHistory: CommandHistory = new CommandHistory()

    View.renderMainPage(fs, cmdHistory)
  }
}
