import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import { fileURLToPath, pathToFileURL } from "url";

// Lấy __filename và __dirname đúng cách
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import configFile from "../config/config.json" with { type: "json" };

const env = process.env.NODE_ENV || "development";
const config = (configFile as any)[env];

const db: any = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load model files
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      (file.endsWith(".ts") || file.endsWith(".js")) &&
      !file.includes(".test")
  );

for (const file of modelFiles) {
  const modelPath = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(modelPath);
  const modelFactory = modelModule.default || modelModule;
  const model = modelFactory(sequelize, DataTypes);
  db[model.name] = model;
}

// Setup associations
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
