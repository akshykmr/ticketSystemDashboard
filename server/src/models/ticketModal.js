const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
 {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    price: { type: Number, required: true },
    date : { type: String, required: true},
    availability : {type : Number, required : true},
    occupancy : {type : Number},
    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    }, 
 },
 { timestamps: true }
);

const Ticket = mongoose.model("ticket", ticketSchema);

module.exports = Ticket;