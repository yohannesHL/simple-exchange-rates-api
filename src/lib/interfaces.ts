export interface IConfig {
  port: number
}

export interface CurrencyAmount {
  currency: string
  value: number
}

export interface ServiceResponse<ResponseDTO> {
  ok: boolean
  data: ResponseDTO
}
