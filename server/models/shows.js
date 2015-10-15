var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    bcrypt      = require('bcrypt-nodejs');

var ShowSchema  = new Schema({
  title: { type: String, required: true, index: {unique: true}},
  date: { type: Date, required: true},
  location: { type: String, required: true},
  venue: { type: String, required: true},
  description: String,
  upcoming: { type: Boolean, required: true}
});

module.exports = mongoose.model('Show', ShowSchema);
