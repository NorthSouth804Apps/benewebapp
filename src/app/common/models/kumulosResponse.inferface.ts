export interface KumulosResponse<T> {
    maxAllowedRequestTime: number;
    payload: {
      data: T;
      message: string;
      status: number;
      success: boolean;
    };
    requestProcessingTime: number;
    requestReceivedTime: number;
    requestedFormat: string;
    requestedMethod: string;
    responseCode: number;
    responseMessage: string;
    sessionToken: string;
    timestamp: number;
  }