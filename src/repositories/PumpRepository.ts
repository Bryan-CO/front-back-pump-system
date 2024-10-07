import { CustomError } from '../errors/FetchError'

export interface DataResponse <T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface TokenPos {
  accessToken: string
  nroPos: string
}

interface RequestPos {
  serialDisk: string
  password: string
}

// eslint-disable-next-line
export class PumpRepository {
  static async checkPos (serialDisk: string, password: string): Promise <TokenPos> {
    const reqData: RequestPos = {
      serialDisk,
      password
    }
    const res = await fetch('http://192.168.18.19:10245/v1/pump/getCheckPos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqData)
    })
    const data: DataResponse<TokenPos> = await res.json()
    console.log({ data })
    if (!data.success) {
      throw new CustomError(res.status, data.error)
    }
    return data.data
    // if (password !== 'ola') throw new CustomError(400, 'Credenciales incorrectas!')
    // return {
    //   accessToken: 'e2348j43h40934dbd834',
    //   nroPos: 'POS1'
    // }
  }
}
