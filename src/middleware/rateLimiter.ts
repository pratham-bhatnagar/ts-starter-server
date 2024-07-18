import rateLimit from 'express-rate-limit';

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  skipSuccessfulRequests: true,
  message: 'Too many requests from this IP, please try again in 15 Minutes!',
});

// add rate limit