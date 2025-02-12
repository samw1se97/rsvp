const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

const guestSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'A Guest must have a name'] },
  email: String,
  phoneNumber: {
    type: String,
    required: [true, 'A Guest must have a phone number'],
    unique: true,
  },
  token: {
    type: String,
    unique: true,
    required: [true, 'A token is required'],
  },
  hasResponded: { type: Boolean, default: false },
  isAttending: {
    type: Boolean,
    default: null,
  },
  isAdmin: { type: Boolean, default: false },
  numberOfGuests: { type: Number, default: 0 },
  mealPreference: String,
  password: {
    type: String,
    required: function () {
      return this.isAdmin;
    }, // Required only for admins
    select: false, // Prevents the password from being returned in queries
  },
  song: {
    type: String,
    default: '',
  },
});

// Pre-save middleware to hash passwords
guestSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash the password if it's new/modified
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method for password validation
guestSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Guest = mongoose.model('Guest', guestSchema);
// Export the model
module.exports = Guest;
