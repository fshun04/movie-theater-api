const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { User, Show } = require("../models/index")
const checker = async function (req, res, next) {
    const parameter = await String(req.params.status);
    console.log(parameter);
    if (req.params.status === null || req.params.status === undefined) {
        throw new Error
    };
    next()
};

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(checker);

router.get("/", async (req, res) => {
    const shows = await Show.findAll();
    res.json(shows);
});

router.get("/:id", async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    res.json(show);
});

router.get("/genres/:genre", async (req, res) => {
    const shows = await Show.findAll({ where: { genre: req.params.genre } });
    res.json(shows)
});

router.put("/:id/rating/:rating", async (req, res) => {
    await Show.update({rating: req.params.rating}, {
        where:{
            id: req.params.id
        }
    });
    const show = await Show.findByPk(req.params.id)
    res.json(show);
});

router.put("/:id/status/:status", checker, async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.json({error: errors.array()});
  } else {
    await Show.update({status: req.params.status}, {
        where:{
            id: req.params.id
        }
    });
    const show = await Show.findByPk(req.params.id)
    res.json(show);
  };
});

router.delete("/:id", async (req, res) => {
    const show = await Show.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json(show);
});

module.exports = router;