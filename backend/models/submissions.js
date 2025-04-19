const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  realName: String,
  gameName: String,
  age: String,
  country: String,
  playingTime: String,
  activeTime: String,
  activePerson: String,
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
