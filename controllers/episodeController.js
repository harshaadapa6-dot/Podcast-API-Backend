const Episode = require("../models/episode");

exports.getEpisodes = async (req, res, next) => {
    try {
        let episodes;

        if (req.query.category) {
            episodes = await Episode.find({
                category: req.query.category
            });
        } else if (req.query.sort === "duration") {
            episodes = await Episode.find().sort({ duration: 1 });
        } else {
            episodes = await Episode.find();
        }

        res.status(200).json(episodes);
    } catch (err) {
        next(err);
    }
}

exports.getEpisodeById = async (req, res, next) => {
    try {
        const episode = await Episode.findById(req.params.id);
        if (!episode) {
            return res.status(404).json({ message: "Episode not found" });
        }
        res.status(200).json(episode);
    } catch (err) {
        next(err);
    }
}

exports.createEpisode = async (req, res, next) => {
    try {
        const { title, duration } = req.body;
        if(!title){
            return res.status(400).json({
                message: "Title is required"
            });
        }
        if(!duration){
            return res.status(400).json({
                message: "Duration is required"
            });
        }
        const epi=await Episode.create(req.body);
        res.status(201).json(epi);
    }catch(err){
        next(err);
    }
}

exports.updateEpisode = async (req, res,next) => {
    try {
        const id = req.params.id;

        const episode = await Episode.findByIdAndUpdate(id, req.body, {
            returnDocument: "after", runValidators: true
        });
        if (!episode) {
            return res.status(404).json({
                message: "Episode not found"
            });
        }

        res.status(200).json(episode);
    } catch(err) {
        next(err);
    }
}

exports.deleteEpisode = async (req, res,next) => {
    try{
        const id = req.params.id;
        const episode = await Episode.findByIdAndDelete(id);

        if(!episode) {
            return res.status(404).json({
                message: "Episode not found"
            });
        }

        res.status(200).json({
            message: "Episode deleted successfully"
        })
    }
    catch(err) {
        next(err);
    }
}

exports.getUnlistened=async (req,res,next)=>{
    try{
        const episode=await Episode.find({
            listened:false
        });
        res.status(200).json(episode);
    }
    catch(err){
        next(err);
    }
}