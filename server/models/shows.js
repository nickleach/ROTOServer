var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    bcrypt      = require('bcrypt-nodejs');

var ShowSchema  = new Schema({
  name: { type: String, required: true, index: {unique: true}},
  date: { type: Date, required: true},
  location: { type: String, required: true},
  description: String
});

module.exports = mongoose.model('Show', ShowSchema);
