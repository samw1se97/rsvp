const Guest = require('../models/guestModel'),
  express = require('express'),
  { v4: uuidv4 } = require('uuid'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');

/**
 * !TODO decapitalize name, mail and validate phone number
 * @function createGuest
 * @description
 * Creates a new guest in the database using the data provided in the request body.
 * Assigns a unique token to the guest before saving. Returns the newly created guest
 * in a structured JSON response or an error message if creation fails.
 *
 * @async
 * @param {Object} req - The request object, containing the guest data in `req.body`.
 * @param {Object} res - The response object to send the JSON result or error message.
 * @returns {Promise<void>} Sends the created guest details or an error response.
 *
 * @example
 * // Request Body: { "name": "John Doe", "isAttending": true, "mealPreference": "vegan" }
 * // Adds the guest to the database and assigns a unique token.
 */
exports.createGuest = async (req, res) => {
  req.body = req.body.map((guest) => {
    const token = uuidv4();
    return { ...guest, token };
  });

  try {
    const answer = await Guest.create(req.body);
    res.status(201).json({ status: 'success', answer: 'great' });
  } catch (err) {
    // console.log(err);

    res.status(400).json({ status: 'failed', err });
  }
};

exports.adminLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const admin = await Guest.findOne({ email, isAdmin: true }).select(
      '+password'
    );
    // console.log(admin);
    if (!admin || !(await admin.correctPassword(password, admin.password))) {
      return res
        .status(401)
        .json({ status: 'fail', message: 'email or password are wrong' });
    }
    const token = jwt.sign(
      { id: admin._id, isAdmin: admin.isAdmin },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: '1d' }
    );
    res.status(200).json({ status: 'success', token });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getAdminData = async (req, res) => {
  try {
    const adminData = req.user;
    res.status(201).json({ status: 'success', data: adminData });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: 'cant find admins Data',
      data: {},
    });
  }
};

/**
 * @function getGuestStats
 * @description
 * Retrieves statistical data about the guest list, including the total number of guests,
 * attending guests, vegan guests, and guests who have not responded. It uses MongoDB
 * aggregation pipelines to process and group the data.
 *
 * @param {Object} req - The request object from the client (not used in this function).
 * @param {Object} res - The response object to send data back to the client.
 * @returns {JSON} Returns a JSON response containing guest statistics or an error message.
 *
 * @async
 * @throws Will send a 404 response with an error message if there is an issue retrieving data.
 *
 * @example Response:
 * {
 *   "status": "success",
 *   "data": {
 *     "numberOfGuestsStats": [
 *       {
 *         "_id": "mealPreference",
 *         "totalAttendingGuests": 50,
 *         "totalQuantity": 30,
 *         "combinedTotal": 80,
 *         "veganGuests": 10,
 *         "notResponded": 5
 *       }
 *     ],
 *     "numberOfVeg": [
 *       { "mealPreference": 10 }
 *     ]
 *   }
 * }
 */
exports.getGuestStats = async (req, res) => {
  // console.log(req.headers);

  try {
    const guestsStats = await Guest.aggregate([
      {
        $group: {
          _id: 'statistics',
          totalAttendingGuests: { $sum: '$numberOfGuests' },
          totalQuantity: { $sum: 1 },
          combinedTotal: { $sum: { $add: ['$numberOfGuests', 1] } },
          veganGuests: {
            $sum: { $cond: [{ $eq: ['$mealPreference', 'vegan'] }, 1, 0] },
          },
          notResponded: {
            $sum: { $cond: [{ $eq: ['$hasResponded', false] }, 1, 0] },
          },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      guestsStats,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      data: 'Trouble fetching the statistics ',
    });
  }
};
