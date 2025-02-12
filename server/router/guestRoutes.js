const express = require('express'),
  guestController = require('../controller/guest.controller'),
  upload = require('../middlewares/fileUpload');

const router = express.Router();

router.route('/').get(guestController.aliasGuests, guestController.getGuests);

router.route('/menu').get(guestController.getMenu);

router
  .route('/gallery')
  .get(guestController.getImages)
  .post(upload, guestController.uploadImages);

router.route('/countdown').get(guestController.getCountdownd);

router
  .route('/:id')
  .get(guestController.getOneGuest)
  .patch(guestController.updateGuest);

module.exports = router;
