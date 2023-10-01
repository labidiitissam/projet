import mongoose from "mongoose";

const PlaceSchema = mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        eventPlaceName: {
            type: String,
            required: true,
        },
        eventPlaceAdress: {
            type: String,
            required: true,
        },
        ownerPhoneNumber: {
            type: String,
            required: true,
        },
        Description: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        Availability: {
            type: Boolean,
            default: true
        },
        eventPlaceImage: {
            type: String,
            required: false,
            default :""
        }
    },


);

const Place = mongoose.model("Place", PlaceSchema);
export default Place;