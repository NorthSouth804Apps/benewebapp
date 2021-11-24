export interface KumulosResponse<T> {
    maxAllowedRequestTime: Number,
    payload: {
      data: T,
      message: String,
      status: Number,
      success: boolean,
    },
    requestProcessingTime: Number,
    requestReceivedTime: Number,
    requestedFormat: String,
    requestedMethod: String,
    responseCode: Number,
    responseMessage: String,
    sessionToken: String,
    timestamp: Number
  }
  