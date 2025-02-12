const Guest = require('../models/guestModel');

/**
 * @middleware findDuplicates
 * @summary Middleware to filter out existing guests from the request body.
 * @description
 * This middleware checks if the provided guests already exist in the database
 * based on their phone numbers. It removes existing guests from the request body
 * before passing the remaining guests to the next middleware/controller.
 *
 * @async
 * @param {Object} req - The request object containing the guest list.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} Returns a 500 error if a database query fails.
 */
exports.findDuplicates = async (req, res, next) => {
  try {
    const guestList = req.body;
    console.log(guestList);
    const phoneNumbers = guestList.map((guest) => guest.phoneNumber);
    const existingGuests = await Guest.find({
      phoneNumber: { $in: phoneNumbers },
    });
    const existingPhoneNumbers = new Set(
      existingGuests.map((guest) => guest.phoneNumber)
    );

    const newGuests = guestList.filter(
      (guest) => !existingPhoneNumbers.has(guest.phoneNumber)
    );

    if (newGuests.length === 0) {
      return res.status(409).json({
        status: 'fail',
        message: 'האורחים האלו כבר קיימים ברשימת האורחים 😁.',
      });
    }
    req.body = newGuests;
    console.log(req.body);

    next();
  } catch (err) {
    console.error('Error checking duplicates:', err);
    res.status(500).json({ status: 'fail', message: 'Internal Server Error' });
  }
};
