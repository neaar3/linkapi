export default class UnauthorizedError extends Error {
    constructor (public message: string, public status: number = 401) {
      super(message)
    }
  }