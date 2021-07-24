export default class HttpError extends Error {
    constructor(public message: string, public status: number = 500) {
      super(message);
    }
  }