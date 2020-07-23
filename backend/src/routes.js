const express = require("express");

const data = require("./data/combos");

const routes = express.Router();

routes.get("/", (_, res) => {
  res.redirect("/combos");
});

routes.get("/combos", (_, res) => {
  return res.json(data.combos);
});

routes.get(`/combo/1`, (_, res) => {
  return res.json(data.combo[0]);
});
routes.get(`/combo/2`, (_, res) => {
  return res.json(data.combo[1]);
});
routes.get(`/combo/3`, (_, res) => {
  return res.json(data.combo[2]);
});
routes.get(`/combo/4`, (_, res) => {
  return res.json(data.combo[3]);
});
routes.get(`/combo/5`, (_, res) => {
  return res.json(data.combo[4]);
});

module.exports = routes;
