var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    bcrypt      = require('bcrypt-nodejs');

var MemberSchema  = new Schema({
  name: { type: String, required: true, index: {unique: true}},
  description: String,
  instrument: String,
  description: String
});

module.exports = mongoose.model('Member', MemberSchema);
