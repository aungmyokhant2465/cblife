const router = require("express").Router();
const { Knowledges } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const limit = req.query.offset ? Number(req.query.limit) : undefined;
  const knowledges = await Knowledges.findAll({
    order: [["createdAt", "DESC"]],
    offset: offset,
    limit: limit,
  });
  const count = await Knowledges.count();
  res.json({ knowledges, count });
});

router.get("/:id", async (req, res) => {
  const knowledge = await Knowledges.findByPk(req.params.id);
  if (knowledge) {
    res.json(knowledge).end();
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
    const knowledge = await Knowledges.create({ ...req.body });
    res.status(201).json(knowledge);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const body = req.body;
  try {
    const knowledge = await Knowledges.findByPk(req.params.id);
    if (!knowledge) {
      res.status(404).end();
    }
    knowledge.image = body.image ?? knowledge.image;
    knowledge.title = body.title ?? knowledge.title;
    knowledge.paragraph = body.paragraph ?? knowledge.paragraph;
    await knowledge.save();
    res.status(201).json(knowledge);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", tokenExtractor, async (req, res) => {
  const knowledge = await Knowledges.findByPk(req.params.id);
  if (knowledge) {
    await knowledge.destroy();
  }
  res.status(204).end();
});

module.exports = router;
