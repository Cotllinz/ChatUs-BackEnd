module.exports = {
  response: (response, status, message, data, pagination) => {
    const result = {}
    result.status = status || 200
    result.massage = message
    result.data = data
    result.pagination = pagination

    return response.status(result.status).json(result)
  }
}
