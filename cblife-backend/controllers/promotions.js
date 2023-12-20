const router = require("express").Router();
const { Promotions } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const limit = req.query.offset ? Number(req.query.limit) : undefined;
  const promotions = await Promotions.findAll({
    order: [["createdAt", "DESC"]],
    offset: offset,
    limit: limit,
  });
  const count = await Promotions.count();
  res.json({ promotions, count });
});

router.get("/:id", async (req, res) => {
  const promotion = await Promotions.findByPk(req.params.id);
  if (promotion) {
    res.json(promotion).end();
  } else {
    res.status(404).end();
  }
});

router.post("/", tokenExtractor, async (req, res) => {
  const body = req.body;
  if (!body.image || !body.title || !body.paragraph) {
    return res.status(400).json({ error: "Invalid inputs" });
  }
  try {
    const promotion = await Promotions.create({ ...req.body });
    res.status(201).json(promotion);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const body = req.body;
  try {
    const promotion = await Promotions.findByPk(req.params.id);
    if (!promotion) {
      res.status(404).end();
    }
    promotion.image = body.image ?? promotion.image;
    promotion.title = body.title ?? promotion.title;
    promotion.paragraph = body.paragraph ?? promotion.paragraph;
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", tokenExtractor, async (req, res) => {
  const promotion = await Promotions.findByPk(req.params.id);
  if (promotion) {
    await promotion.destroy();
  }
  res.status(204).end();
});

module.exports = router;
