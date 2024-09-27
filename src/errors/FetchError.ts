export class FetchError extends Error {
  constructor (public statusCode: number, message?: string) {
    super(message)
  }
}
