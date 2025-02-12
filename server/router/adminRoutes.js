const express = require('express'),
  adminController = require('../controller/admin.controller'),
  {
    protect,
    restrictToAdmin,
    protectAdminRoute,
  } = require('../middlewares/authMiddleware'),
  { findDuplicates } = require('../middlewares/checkDuplicates'),
  router = express.Router();
exports.router = router;

router.route('/lgn').post(adminController.adminLogIn);

router
  .route('/dashboard/stats')
  .get(protectAdminRoute, adminController.getGuestStats);

router.route('/all-songs').get();

router
  .route('/')
  .get(protectAdminRoute, adminController.getAdminData)
  .post(findDuplicates, adminController.createGuest);

module.exports = router;
