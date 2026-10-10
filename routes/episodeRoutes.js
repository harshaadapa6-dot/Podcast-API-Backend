const express = require("express");
const router = express.Router();
const Episode = require("../models/episode");
const episodeController = require("../controllers/episodeController");

router.get("", episodeController.getEpisodes);

router.get("/unlistened",episodeController.getUnlistened);

router.get("/:id", episodeController.getEpisodeById);

router.post("", episodeController.createEpisode);

router.put("/:id", episodeController.updateEpisode);

router.delete("/:id", episodeController.deleteEpisode);

//Harsha Project

module.exports = router;