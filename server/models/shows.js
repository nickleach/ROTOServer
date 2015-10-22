var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    bcrypt      = require('bcrypt-nodejs');

var ShowSchema  = new Schema({
  date: { type: Number, required: true, index: {unique: true}},
  location: { type: String, required: true},
  venue: { type: String, required: true},
  description: String,
  upcoming: { type: Boolean, required: true},
  time: String
});

module.exports = mongoose.model('Show', ShowSchema);
