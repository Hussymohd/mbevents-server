const mongoose = require('mongoose');
const { trim } = require('validator');
const Schema = mongoose.Schema

//files --> String(link to image)
//req.files req.body
//express.fileupload - allows backend get access to files
const eventSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value === "online" || value.trim().length > 0;
        },
      },
    },
    price: {
      free: {
        type: Boolean,
        default: false,
      },
      regular: {
        type: Number,
        required: function () {
          return !this.price.free;
        },
        min: 0,
      },
      vip: {
        type: Number,
        required: function () {
          return !this.price.free;
        },
        min: 0,
      },
    },
    hostedBy: { //who is creating the event
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema)