export class Help {
  static getAllCommandHelp(): string {
    return `
        <p>the supported commands in this app are:</p>
        <p>pwd []</p>
        <p>ls [-option] [file or directory path]</p>
        <p>touch [filepath]</p>
        <p>mkdir [directorypath]</p>
        <p>cd [directorypath]</p>
        <p>rm [filepath]</p>
        <p>print [filepath]</p>
        <p>setContent [filepath]</p>
        <p>clear []</p>
        <p>help [command]</p>
        `
  }

  static getPwdDiscription(): string {
    return `
        <p>pwd []:</p>
        <p>現在の作業ディレクトリのパスを出力します。</p>
    `
  }

  static getLsDiscription(): string {
    return `
        <p>ls [?fileOrDirName]:</p>
        <p>ターゲットノードがディレクトリの場合、ターゲットディレクトリノードの直下の全てのファイルリストを出力します。ターゲットノードがファイルの場合、与えられたノードのみ出力します。引数が存在しない場合、カレントディレクトリの全てのファイルリストを出力します。</p>
        `
  }

  static getTouchDiscription(): string {
    return `
        <p>touch [fileOrDirName]:</p>
        <p>指定した名前のファイルをカレントディレクトリに作成します。ファイルまたはディレクトリが既に存在する場合は、ノードのdateModified値を現在の日付に更新します。</p>
    `
  }

  static getMkdirDiscription(): string {
    return `
        <p>mkdir [dirName]:</p>
        <p>与えられた名前でカレントディレクトリに新しいディレクトリを作成します。</p>
    `
  }

  static getCdDiscription(): string {
    return `
        <p>cd [..| dirName]:</p>
        <p>現在の作業ディレクトリを指定されたものに変更します。引数が指定されていない場合はホームディレクトリに、引数が'..'の場合はカレントディレクトリを親ディレクトリに、そうでない場合はカレントディレクトリをカレントディレクトリ内のdirNameに変更します。</p>
    `
  }

  static getRmDiscription(): string {
    return `
        <p>rm [fileOrDirName]:</p>
        <p>指定したfileOrDirNameのファイルまたはディレクトリをカレントディレクトリから削除します。</p>
    `
  }

  static getPrintDiscription(): string {
    return `
        <p>print [filename]:</p>
        <p>カレントディレクトリ内の指定されたfileNameのファイルの情報を表示します。</p>
    `
  }

  static getSetCountDiscription(): string {
    return `
        <p>setCount [filename]:</p>
        <p>与えられたfileNameの.content値をカレントディレクトリに設定します。</p>
    `
  }

  static getClearDiscription(): string {
    return `
      <p>clear []:</p>
      <p>ターミナル画面をクリアします。</p>
    `
  }
}
