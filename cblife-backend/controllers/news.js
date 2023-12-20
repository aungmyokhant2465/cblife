const router = require("express").Router();
const { News } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const limit = req.query.offset ? Number(req.query.limit) : undefined;
  const news = await News.findAll({
    order: [["createdAt", "DESC"]],
    offset: offset,
    limit: limit,
  });
  const count = await News.count();
  res.json({ news, count });
});

router.get("/:id", async (req, res) => {
  const news = await News.findByPk(req.params.id);
  if (news) {
    res.json(news).end();
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
    const news = await News.create({ ...req.body });
    res.status(201).json(news);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const body = req.body;
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) {
      res.status(404).end();
    }
    news.image = body.image ?? news.image;
    news.title = body.title ?? news.title;
    news.paragraph = body.paragraph ?? news.paragraph;
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", tokenExtractor, async (req, res) => {
  const news = await News.findByPk(req.params.id);
  if (news) {
    await news.destroy();
  }
  res.status(204).end();
});

module.exports = router;
