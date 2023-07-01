export class Help {
  static getAllCommandHelp(): string {
    return `
      <p>the supported commands in this app are:</p>
      <p><span class="text-blue-500">pwd</span> []</p>
      <p><span class="text-blue-500">ls</span> [-option] [file or directory path]</p>
      <p><span class="text-blue-500">touch</span> [filepath]</p>
      <p><span class="text-blue-500">mkdir</span> [directorypath]</p>
      <p><span class="text-blue-500">cd</span> [directorypath]</p>
      <p><span class="text-blue-500">rm</span> [filepath]</p>
      <p><span class="text-blue-500">print</span> [filepath]</p>
      <p><span class="text-blue-500">setContent</span> [filepath]</p>
      <p><span class="text-blue-500">clear</span> []</p>
      <p><span class="text-blue-500">help</span> [command_name]</p>
      `
  }

  static getCommandDescription(command: string): string {
    switch (command) {
      case 'pwd':
        return `
          <p><span class="text-blue-500">pwd</span> []:</p>
          <p>Outputs the current working directory path.</p>
        `
      case 'ls':
        return `
          <p><span class="text-blue-500">ls</span> [fileOrDirName]:</p>
          <p>If the target node is a directory, it outputs a list of all files directly under the target directory node. If the target node is a file, it only outputs the given node. If no argument is provided, it outputs a list of all files in the current directory.</p>
        `
      case 'touch':
        return `
          <p><span class="text-blue-500">touch</span> [fileOrDirName]:</p>
          <p>Creates a file with the specified name in the current directory. If the file or directory already exists, it updates the dateModified value of the node to the current date.</p>
        `
      case 'mkdir':
        return `
          <p><span class="text-blue-500">mkdir</span> [dirName]:</p>
          <p>Creates a new directory with the given name in the current directory.</p>
        `
      case 'cd':
        return `
          <p><span class="text-blue-500">cd</span> [..| dirName]:</p>
          <p>Changes the current working directory to the specified one. If no argument is provided, it changes the current directory to the home directory. If the argument is '..', it changes the current directory to the parent directory. Otherwise, it changes the current directory to the 'dirName' within the current directory.</p>
        `
      case 'rm':
        return `
          <p><span class="text-blue-500">rm</span> [fileOrDirName]:</p>
          <p>Deletes the specified 'fileOrDirName' file or directory from the current directory.</p>
        `
      case 'print':
        return `
          <p><span class="text-blue-500">print</span> [filename]:</p>
          <p>Displays information about the specified 'filename' file in the current directory.</p>
        `
      case 'setContent':
        return `
          <p><span class="text-blue-500">setContent</span> [filename]:</p>
          <p>Sets the .content value of the given 'filename' to the current directory.</p>
        `
      case 'clear':
        return `
          <p><span class="text-blue-500">clear</span> []:</p>
          <p>Clears the terminal screen.</p>
        `
      default:
        return `<p><span class="text-red-500">Error</span>: the command does not exist</p>`
    }
  }
}
