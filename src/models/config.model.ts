export type Config = {
  environment: Environment
  baseUrlAPI: string
  apiKey: string
  baseImageUrl: string
}

export enum Environment {
  DEV = 'dev',
  SIT = 'sit',
  UAT = 'uat',
  PROD = 'prod'
}
