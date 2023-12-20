const router = require("express").Router();
const { Onboardings } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const limit = req.query.offset ? Number(req.query.limit) : undefined;
  const onboardings = await Onboardings.findAll({
    order: [["createdAt", "DESC"]],
    offset: offset,
    limit: limit,
  });
  const count = await Onboardings.count();
  res.json({ onboardings, count });
});

router.get("/:id", async (req, res) => {
  const onboarding = await Onboardings.findByPk(req.params.id);
  if (onboarding) {
    res.json(onboarding).end();
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
    const onboarding = await Onboardings.create({ ...req.body });
    res.status(201).json(onboarding);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const body = req.body;
  try {
    const onboarding = await Onboardings.findByPk(req.params.id);
    if (!onboarding) {
      res.status(404).end();
    }
    onboarding.image = body.image ?? onboarding.image;
    onboarding.title = body.title ?? onboarding.title;
    onboarding.paragraph = body.paragraph ?? onboarding.paragraph;
    await onboarding.save();
    res.status(201).json(onboarding);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", tokenExtractor, async (req, res) => {
  const onboarding = await Onboardings.findByPk(req.params.id);
  if (onboarding) {
    await onboarding.destroy();
  }
  res.status(204).end();
});

module.exports = router;
