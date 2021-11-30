
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BroadcastSchema = new Schema([{
  id: {
    type: String
  },
  t: { type: String },
  d: { type: String },
  board: { type: String },
  snippet: {
    publishedAt: {
      type: String
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    thumbnails: {
      default: {
        url: { type: String },
        width: { type: Number },
        height: { type: Number }
      },
      medium: {
        url: { type: String },
        width: { type: Number },
        height: { type: Number }
      },
      high: {
        url: { type: String },
        width: { type: Number },
        height: { type: Number }
      },
      standard: {
        url: { type: String },
        width: { type: Number },
        height: { type: Number }
      },
      maxres: {
        url: { type: String },
        width: { type: Number },
        height: { type: Number },
      }
    },
    scheduledStartTime: { type: String },
    liveChatId: { type: String },

  },
  status: {
    type: String,
    default: 'upcoming'
  },
  creationDate: { type: Date, default: Date.now },
  updationDate: { type: Date, default: Date.now },
}]);

// Export the model
module.exports = mongoose.model('Broadcast', BroadcastSchema);
