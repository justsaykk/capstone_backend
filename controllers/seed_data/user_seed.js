// Dependencies

const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Seed Data
const userSeeds = [
  {
    name: "user01",
    email: "user01@user.com",
    password: bcrypt.hashSync("123456", saltRounds),
  },
  {
    name: "user02",
    email: "user02@user.com",
    password: bcrypt.hashSync("123456", saltRounds),
  },
  {
    name: "user03",
    email: "user03@user.com",
    password: bcrypt.hashSync("123456", saltRounds),
  },
];

module.exports = userSeeds;
