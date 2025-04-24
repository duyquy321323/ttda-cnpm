const { WHITELIST_DOMAINS } = require("../utils/constants")

const corsOption = {
  origin: function (origin, callback) {
    if (!origin)
      return callback(null, true)

    if (WHITELIST_DOMAINS.includes(origin))
      return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  },
  optionsSuccessStatus: 200,

  // Cho phép nhận cookie từ request
  credentials: true
}

module.exports = corsOption