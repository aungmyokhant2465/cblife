const router = require("express").Router();
const { Products } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const limit = req.query.offset ? Number(req.query.limit) : undefined;
  const products = await Products.findAll({
    order: [["createdAt", "DESC"]],
    offset: offset,
    limit: limit,
  });
  const count = await Products.count();
  res.json({ products, count });
});

router.get("/:id", async (req, res) => {
  const product = await Products.findByPk(req.params.id);
  if (product) {
    res.json(product).end();
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
    const product = await Products.create({ ...req.body });
    res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const body = req.body;
  try {
    const product = await Products.findByPk(req.params.id);
    if (!product) {
      res.status(404).end();
    }
    product.image = body.image ?? product.image;
    product.title = body.title ?? product.title;
    product.paragraph = body.paragraph ?? product.paragraph;
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", tokenExtractor, async (req, res) => {
  const product = await Products.findByPk(req.params.id);
  if (product) {
    await product.destroy();
  }
  res.status(204).end();
});

module.exports = router;
