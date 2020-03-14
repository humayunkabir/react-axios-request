class RequestException extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = "RequestException";
  }
}

export default RequestException;
