const router = require("express").Router();
const { Privates } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const limit = req.query.offset ? Number(req.query.limit) : undefined;
  const privates = await Privates.findAll({
    order: [["createdAt", "DESC"]],
    offset: offset,
    limit: limit,
  });
  const count = await Privates.count();
  res.json({ privates, count });
});

router.get("/:id", async (req, res) => {
  const private = await Privates.findByPk(req.params.id);
  if (private) {
    res.json(private).end();
  } else {
    res.status(404).end();
  }
});

router.post("/", tokenExtractor, async (req, res) => {
  const body = req.body;
  if (
    !body.image ||
    !body.name ||
    !body.address ||
    !body.phone ||
    !body.openingHour
  ) {
    return res.status(400).json({ error: "Invalid inputs" });
  }
  try {
    const private = await Privates.create({ ...req.body });
    res.status(201).json(private);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const body = req.body;
  try {
    const private = await Privates.findByPk(req.params.id);
    if (!private) {
      res.status(404).end();
    }
    private.image = body.image ?? private.image;
    private.name = body.name ?? private.name;
    private.address = body.address ?? private.address;
    private.phone = body.phone ?? private.phone;
    private.openingHour = body.openingHour ?? private.openingHour;
    await private.save();
    res.status(201).json(private);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", tokenExtractor, async (req, res) => {
  const private = await Privates.findByPk(req.params.id);
  if (private) {
    await private.destroy();
  }
  res.status(204).end();
});

module.exports = router;
