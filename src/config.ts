export const commands: string[] = ['touch', 'ls', 'cd', 'pwd', 'print', 'setCount', 'rm', 'help']

export interface CommandLineInput {
  command: string
  commandOption: string[]
  args: string[]
}

export interface ValidatorResponse {
  isValid: boolean
  errorMessage: string
}