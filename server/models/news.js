var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var NewsSchema = new Schema({
  date: { type: Number, required: true, index: {unique: true}},
  title: { type: String, required: true},
  story: { type: String, required: true},
  createdBy: { type: String, required: true},
  modifiedBy: { type: String, required: true}
});

module.exports = mongoose.model('News', NewsSchema);
