export const config = {
  commands: ['touch', 'ls', 'cd', 'mkdir', 'pwd', 'print', 'setContent', 'rm', 'help', 'clear'],
  noArgumentCommands: ['pwd', 'clear'],
  singleArgumentCommands: ['cd', 'rm', 'mkdir', 'touch', 'print', 'setContent', 'help'],
  noOptionCommands: ['touch', 'cd', 'pwd', 'print', 'setContent', 'help', 'clear'],
}

export interface CommandLineInput {
  command: string
  commandOption: string[]
  args: string[]
}

export interface ValidatorResponse {
  isValid: boolean
  errorMessage: string
}
