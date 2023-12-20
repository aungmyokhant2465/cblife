const router = require("express").Router();
const { Partners } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const limit = req.query.offset ? Number(req.query.limit) : undefined;
  const partners = await Partners.findAll({
    order: [["createdAt", "DESC"]],
    offset: offset,
    limit: limit,
  });
  const count = await Partners.count();
  res.json({ partners, count });
});

router.get("/:id", async (req, res) => {
  const partner = await Partners.findByPk(req.params.id);
  if (partner) {
    res.json(partner).end();
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
    !body.phoneNote ||
    !body.link
  ) {
    return res.status(400).json({ error: "Invalid inputs" });
  }
  try {
    const partner = await Partners.create({ ...req.body });
    res.status(201).json(partner);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const body = req.body;
  try {
    const partner = await Partners.findByPk(req.params.id);
    if (!partner) {
      res.status(404).end();
    }
    partner.image = body.image ?? partner.image;
    partner.name = body.name ?? partner.name;
    partner.address = body.address ?? partner.address;
    partner.phone = body.phone ?? partner.phone;
    partner.phoneNote = body.phoneNote ?? partner.phoneNote;
    partner.link = body.link ?? partner.limit;
    await partner.save();
    res.status(201).json(partner);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", tokenExtractor, async (req, res) => {
  const partner = await Partners.findByPk(req.params.id);
  if (partner) {
    await partner.destroy();
  }
  res.status(204).end();
});

module.exports = router;
