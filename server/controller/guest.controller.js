const express = require('express'),
  { v4: uuidv4 } = require('uuid'),
  Guest = require('../models/guestModel'),
  menuData = require('../DL/menu'),
  fs = require('fs');
const upload = require('../middlewares/fileUpload');
const multer = require('multer');
// upload = multer({ dest: 'uploads/' });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

/**
 * @function aliasGuests
 * @description
 * Middleware function to process and modify query parameters for filtering, sorting,
 * selecting fields, and pagination of guest data. It enhances the query object in
 * the request with MongoDB-compatible syntax and default values for certain operations.
 *
 * @param {Object} req - The request object containing query parameters.
 * @param {Object} res - The response object (not used in this middleware).
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void} Modifies the `req.query` object and calls the `next` middleware.
 *
 * @example Usage in an Express route:
 * router.get('/guests', aliasGuests, getGuests);
 */
exports.aliasGuests = (req, res, next) => {
  let queryObj = { ...req.query };
  // console.log(queryObj);
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);
  // console.log('===> ', { ...req.query });

  // let queryStr = JSON.stringify(queryObj);
  queryObj = JSON.stringify(queryObj).replace(
    /\b(gte|gt|lte|lt|ne)\b/g,
    (match) => `$${match}`
  );

  queryObj = JSON.parse(queryObj);
  req.query.filter = { ...queryObj };
  // console.log(req.query.filter);

  //   SORTING
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    req.query.sort = sortBy;
  } else {
    req.query.sort = 'isAttending';
  }

  //SELECTING FIELDS
  const fields = req.query.fields ? req.query.fields.split(',').join(' ') : '';
  req.query.select = fields;
  // console.log();

  // Get the page and limit values from the query string, with defaults
  const page = req.query.page * 1 || 1, // Convert to number and default to 1
    limit = req.query.limit * 1 || 100, // Convert to number and default to 100
    skip = (page - 1) * limit;
  req.query.skip = skip;
  req.query.limit = limit;
  next();
};

/**
 * @function getGuests
 * @description
 * Retrieves a list of guests from the database based on the filtering, sorting,
 * selecting, and pagination parameters provided in the request query. It uses the
 * MongoDB query syntax to fetch data and returns a structured JSON response.
 *
 * @async
 * @param {Object} req - The request object containing processed query parameters.
 * @param {Object} res - The response object to send the JSON result or error message.
 * @returns {Promise<void>} Sends the retrieved guest data or an error response.
 *
 * @example
 * // Example query parameters:
 * // /api/guests?page=1&limit=10&sort=name&select=name,email&gte[age]=18
 * // Middleware @aliasGuests processes these parameters before calling getGuests.
 */
exports.getGuests = async (req, res) => {
  try {
    const { filter, sort: sortBy, select, skip, limit } = req.query;

    console.log(req.query);

    const guests = await Guest.find(filter)
      .sort(sortBy)
      .select(select)
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      status: 'success',
      results: guests.length,
      data: guests,
    });
  } catch (err) {
    res.status(404).json({ status: 'failed', data: err });
  }
};

/**
 * @function getOneGuest
 * @description
 * Fetches a single guest from the database using their unique ID provided
 * in the request parameters. Returns the guest details in a structured
 * JSON response or an error message if the retrieval fails.
 *
 * @async
 * @param {Object} req - The request object, containing the guest ID in `req.params.id`.
 * @param {Object} res - The response object to send the JSON result or error message.
 * @returns {Promise<void>} Sends the guest details or an error response.
 *
 * @example
 * // Request URL: /api/guests/12345
 * // Retrieves the guest with the ID 12345.
 */
exports.getOneGuest = async (req, res) => {
  // console.log(req.headers);

  try {
    const oneGuest = await Guest.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: oneGuest,
    });
  } catch (err) {
    res.status(404).json({ status: 'failed', data: err });
  }
};

/**
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
// exports.createGuest = async (req, res) => {
//   req.body.token = uuidv4();

//   try {
//     const newgUest = await Guest.create(req.body);
//     res.status(201).json({ status: 'success', data: newgUest });
//   } catch (err) {
//     res.status(400).json({ status: 'failed', data: err });
//   }
// };

/**
 * @function updateGuest
 * @description
 * Updates the details of an existing guest in the database using the provided ID and request body.
 * Automatically sets the `hasResponded` field to `true` for any update.
 *
 * @async
 * @param {Object} req - The request object containing the guest ID in `req.params.id` and update data in `req.body`.
 * @param {Object} res - The response object to send the JSON result or error message.
 * @returns {Promise<void>} Sends the updated guest details or an error response.
 *
 * @example
 * // Request Body: { "isAttending": true, "numberOfGuests": 2, "mealPreference": "vegan" }
 * // Updates the specified guest in the database and sets `hasResponded` to `true`.
 */
exports.updateGuest = async (req, res) => {
  console.log(req.body);

  try {
    const updatedGuest = await Guest.findByIdAndUpdate(
      req.params.id,
      { ...req.body, hasResponded: true },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      updatedGuest,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      data: 'Trouble updating the document/this guest ',
    });
  }
};

/**
 * @function getMenu
 * @description
 * Responds with the pre-defined menu data to the client. This is typically used to provide information about the event's menu options.
 *
 * @async
 * @param {Object} req - The request object (not utilized in this function).
 * @param {Object} res - The response object to send the menu data or an error message.
 * @returns {Promise<void>} Sends the menu data or an error response.
 *
 * @example
 * // Example Response:
 * {
 *   "status": "success",
 *   "menuData": [
 *     { "title": "Starter", "content": [{ "name": "Salad", "summary": "Fresh greens with dressing" }] },
 *     { "title": "Main Course", "content": [{ "name": "Steak", "summary": "Grilled to perfection" }] }
 *   ]
 * }
 */
exports.getMenu = async (req, res) => {
  try {
    // console.log(JSON.stringify(menuData));
    res.status(200).json({
      status: 'success',
      menuData: menuData,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      data: 'Trouble updating the document/this guest ',
    });
  }
};

exports.uploadImages = async (req, res) => {
  try {
    console.log(req.fileValidationError);

    if (req.fileValidationError) {
      return res.status(400).json({ error: req.fileValidationError });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Please upload at least one file' });
    }
    console.log(req.files);
    res.json({ message: 'Files uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.uploadImages = (req, res) => {
//   console.log(req);

//   upload(req, res, (err) => {
//     console.log(req);

//     if (err instanceof multer.MulterError) {
//       // Handle Multer-specific errors (e.g., file size limit exceeded)
//       return res.status(400).json({ message: err.message });
//     } else if (req.fileValidationError) {
//       // Handle file validation errors (invalid file type)
//       return res.status(400).json({ message: req.fileValidationError });
//     } else if (err) {
//       // Handle any other errors
//       return res
//         .status(500)
//         .json({ message: 'Something went wrong with the upload!' });
//     }

//     // If file upload is successful
//     res
//       .status(200)
//       .json({ message: 'Files uploaded successfully!', files: req.files });
//   });
// };

exports.getImages = async (req, res) => {
  try {
    const uploadDir = './uploads';
    const files = fs.readdirSync(uploadDir);
    // console.log(files);
    // Creating a array of file paths
    const imagePaths = files.map((file) => `/uploads/${file}`);
    console.log(req.fileValidationError);

    res.json({ images: imagePaths });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCountdownd = async (req, res) => {
  const weddingDate = new Date('2025-08-25T00:00:00'); // Wedding date
  const now = new Date(); // Current time

  const timeDifference = weddingDate - now; // Difference in milliseconds

  if (timeDifference <= 0) {
    return res.json({
      message: "Congratulations! It's your wedding day! 🎉",
    });
  }

  // Convert milliseconds to days, hours, minutes, seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  // const seconds = Math.floor((timeDifference / 1000) % 60);

  res.json({ days, hours, minutes });
};
