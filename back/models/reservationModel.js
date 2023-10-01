import mongoose from "mongoose";

const ReservationSchema = mongoose.Schema(
    {
      date: {
        type: Date,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
      },
      isCancled:{
        type:Boolean,
        default:false
      }
    },
    { timestamps: true }
  );

const Reservation  = mongoose.model("Reservation", ReservationSchema);
export default Reservation;