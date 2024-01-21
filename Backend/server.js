const express = require("express");
const cors = require("cors");
const app = express();
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const employeeRoutes = require("./routes/employee");
const assetCategoryRoutes = require("./routes/assetCategory");
const assetMasterRoutes = require("./routes/assetMaster");
const issueCreatedRoutes = require("./routes/issueCreated");
const scrapAssetRoutes = require("./routes/scrapAsset");
const sequelize = require("./database");

app.use(express.json());
app.use(cors());

app.use("/authSignup", signupRoutes);
app.use("/auth", loginRoutes);
app.use("/employee", employeeRoutes);
app.use("/category", assetCategoryRoutes);
app.use("/assets", assetMasterRoutes);
app.use("/issues", issueCreatedRoutes);
app.use("/scrap", scrapAssetRoutes);

app.listen(3001, () => console.log("Server Running on Port 3001"));
