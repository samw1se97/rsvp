const Guest = require('../models/guestModel'),
  jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  console.log(req.body);

  try {
    if (!req.body.userName || !req.body.password) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Missing username or password' });
    }

    const token = req.headers.authorization || req.query.token;
    if (!token) {
      return res.status(401).json({
        status: 'failed',
        isToken: false,
        message: 'Unauthorized. No token provided.',
      });
    }

    const guest = await Guest.findOne({ token });

    if (!guest) {
      return res.status(401).json({
        status: 'failed',
        isToken: false,
        message: 'Unauthorized. Invalid token.',
      });
    }

    // // Attach guest data to the request for use in other middleware/controllers
    req.guest = guest;

    next();
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Server error during authentication.',
    });
  }
};

exports.restrictToAdmin = (req, res, next) => {
  if (!req.guest.isAdmin) {
    return res
      .status(403)
      .json({ status: 'failed', message: 'Forbidden. Admin access required.' });
  }
  // console.log(req);

  next();
};

/**
 * @middleware protectAdminRoute
 * @summary Middleware to protect admin routes.
 * @description This middleware verifies the JWT token from the request headers,
 * checks if the user exists, and ensures they have admin privileges before granting access.
 * If authentication fails, it returns an appropriate error response.
 *
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} req.headers - HTTP headers containing the Authorization token.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void} Calls `next()` if authentication is successful, otherwise sends an error response.
 *
 * @serverEndpoint Protects any admin route requiring authentication.
 *
 * @errorHandling
 * - Returns `403` if no token is provided.
 * - Returns `403` if the user is not an admin or does not exist.
 * - Returns `401` if the token is invalid or expired.
 */
exports.protectAdminRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res
        .status(403)
        .json({ status: 'fail', message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    const admin = await Guest.findById(decoded.id);

    if (!admin || !admin.isAdmin) {
      return res.status(403).json({ status: 'fail', message: 'Access denied' });
    }
    req.user = admin; // Add user details to request
    next();
  } catch (err) {
    res
      .status(401)
      .json({ status: 'fail', message: 'Invalid or expired token' });
  }
};
