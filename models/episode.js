const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
        min: 0,
        max: 300,
    },
    category: {
        type: String,
        enum:["tech", "comedy", "news", "story", "other"],
        required: true
    },
    listened: {
        type: Boolean,
        default:false
    },
    releasedOn:{
        type:Date,
    }
}, {
    timestamps : true
});

module.exports = mongoose.model("Episode", episodeSchema)