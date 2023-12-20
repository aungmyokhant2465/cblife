/**
 * @dev This is user for dashboard, it contianer signin, signup or create, by one fetching and updating.
 */

const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const { Auth } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

// router.get("/", tokenExtractor, async (req, res) => {
//   const users = await Auth.scope("withoutPassword").findAll({
//     order: [
//       ["active", "ASC"],
//       ["createdAt", "DESC"],
//     ],
//   });
//   res.json(users);
// });

router.get("/me", tokenExtractor, async (req, res) => {
  const decodedToken = req.decodedToken;
  const { id } = decodedToken;
  const auth = await Auth.scope("withoutPassword").findByPk(id);
  if (!auth.active) {
    return res.status(401).json({ error: "deactivated account" });
  }
  if (auth) {
    res.json(auth);
  } else {
    res.status(404).end();
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    if (!body.username || !body.password) {
      return res.status(400).json({ error: "Invalid inputs" });
    }
    const existingAuth = await Auth.findOne({
      where: {
        username: body.username,
      },
    });
    if (existingAuth) {
      return res.status(400).json({ error: "Name is alredy existed." });
    }
    const passwordHash = req.body.password
      ? await bcrypt.hash(req.body.password, 10)
      : null;
    const auth = await Auth.create({ ...req.body, password: passwordHash });
    let jsonAuth = auth.toJSON();
    delete jsonAuth["password"];
    res.status(201).json(jsonAuth);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (request, response) => {
  const body = request.body;
  if (!body.username || !body.password) {
    return response.status(400).json({ error: "invalid input" });
  }
  const auth = await Auth.findOne({
    where: {
      username: body.username,
    },
  });
  const passwordCorrect =
    auth === null ? false : await bcrypt.compare(body.password, auth.password);
  if (!(auth && passwordCorrect)) {
    return response.status(400).json({
      error: "Invalid username or password",
    });
  }
  const authForToken = {
    id: auth.id,
    username: auth.username,
  };
  const token = jwt.sign(authForToken, SECRET, { expiresIn: 12 * 60 * 60 });
  response.status(200).send({ token });
});

router.put("/", tokenExtractor, async (req, res) => {
  const decodedToken = req.decodedToken;
  const { id } = decodedToken;
  const auth = await Auth.scope("withoutPassword").findByPk(id);
  if (!auth.active) {
    return res.status(401).json({ error: "deactivated account" });
  }
  if (auth) {
    auth.username = req.body.username ?? auth.username;
    auth.active = req.body.active === undefined ? auth.active : req.body.active;
    auth.role = req.body.role ?? auth.role;
    if (req.body.password) {
      const passwordHash = req.body.password
        ? await bcrypt.hash(req.body.password, 10)
        : null;
      auth.password = passwordHash;
    }
    await auth.save();
    res.json(auth);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
