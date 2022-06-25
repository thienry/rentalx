interface IMailVariable {
  name: string
  link: string
}

interface IMailProvider {
  sendMail(to: string, subject: string, variables: IMailVariable, path: string): Promise<void>
}

export { IMailProvider }
