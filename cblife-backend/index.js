const express = require("express");
const app = express();
const cors = require("cors");

const { PORT } = require("./utils/config");
const {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
} = require("./utils/middleware");
const { connectToDatabase } = require("./utils/db");

const authRouter = require("./controllers/auths");
const newsRouter = require("./controllers/news");
const uploadRouter = require("./controllers/upload");
const promotionRouter = require("./controllers/promotions");
const knowledgeRouter = require("./controllers/knowledges");
const onboardingRouter = require("./controllers/onboardings");
const productRouter = require("./controllers/products");
const partnerRouter = require("./controllers/partners");
const privateRouter = require("./controllers/privates");

app.use(cors());
app.use(express.json());

app.use("/api/upload", tokenExtractor, uploadRouter);
app.use("/api/auths", authRouter);
app.use("/api/news", newsRouter);
app.use("/api/promotions", promotionRouter);
app.use("/api/knowledges", knowledgeRouter);
app.use("/api/onboardings", onboardingRouter);
app.use("/api/partners", partnerRouter);
app.use("/api/privates", privateRouter);
app.use("/api/products", productRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
