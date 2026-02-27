// import mongoose from "mongoose";

// const itinerarySchema = new mongoose.Schema({
//   day: Number,
//   title: String,
//   image: String,
//   details: [String],
//   note: {
//     type: String,
//     default: "",
//   },
// });

// const packageSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     tourType: { type: String, required: true },
//     category: String,
//     duration: String,
//     price: Number,
//     originalPrice: Number,
//     rating: Number,
//     description: String,

//     image: String,

//     highlights: [String],
//     transfer: [String],

//     sightseeing: {
//       type: Map,
//       of: [String],
//     },

//     ItenaryDetailsImages: [String],

//     itinerary: [itinerarySchema],
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Package ||
//   mongoose.model("Package", packageSchema);


import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
});

const itinerarySchema = new mongoose.Schema({
  day: Number,
  title: String,
  image: imageSchema,
  details: [String],
  note: {
    type: String,
    default: "",
  },
});

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tourType: { type: String, required: true },
    category: String,
    duration: String,
    price: Number,
    originalPrice: Number,
    rating: Number,
    description: String,

    image: imageSchema,

    highlights: [String],
    transfer: [String],

    sightseeing: {
      type: Map,
      of: [String],
    },

    ItenaryDetailsImages: [imageSchema],

    itinerary: [itinerarySchema],
  },
  { timestamps: true }
);

export default mongoose.models.Package ||
  mongoose.model("Package", packageSchema);