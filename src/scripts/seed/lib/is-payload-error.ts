type PayloadErrorLike = {
  name: string
  status: number
  data?: {
    collection: string
    errors?: {
      message?: string
      path?: string
    }[]
  }
}

export function isPayloadError(error: unknown): error is PayloadErrorLike {
  return (
    !!error && typeof error === 'object' && 'name' in error && 'status' in error && 'data' in error
  )
}

/**example 
 * 
 * Error creating admin: {
  "data": {
    "collection": "users",
    "errors": [
      {
        "message": "A user with the given email is already registered.",
        "path": "email"
      }
    ]
  },
  "isOperational": true,
  "isPublic": true,
  "status": 400,
  "name": "ValidationError"
}

 * 
 * 
*/
