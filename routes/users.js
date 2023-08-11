const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { User, Show } = require("../models/index")

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    res.json(user);
});

router.get("/:id/shows", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const shows = await user.getShows({ joinTableAttributes: [] });
    res.json(shows)
});

router.put("/:userid/shows/:showid", async (req, res) => {
    const user = await User.findByPk(req.params.userid);
    await user.addShow(req.params.showid);
    const shows = await user.getShows({ joinTableAttributes: [] });
    res.json(shows);
});

module.exports = router;