import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import sharp from "sharp";
import "dotenv/config";
import multer from "multer";
import express from "express";
const app = express();
const port = 3000;
import {
  login,
  create,
  isAdmin,
  getUserNames,
  addPuppy,
  getAllPuppies,
  deleteOwnPuppy,
} from "./db.js";

import bodyParser from "body-parser";
app.use(bodyParser.json());

import cookieParser from "cookie-parser";
app.use(cookieParser());

import cors from "cors";
const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors());

import session from "express-session";
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "mainsecret21",
    cookie: {
      secure: false,
    },
  })
);

//LOGIN
app.post("/login", async (req, res) => {
  let [exists, pwIsTrue, resp] = await login(req.body.email, req.body.password);
  if (exists && pwIsTrue) {
    let id = resp._id.toString();
    let profile = await isAdmin(id);
    req.session.admin = profile;
    req.session.logged = true;
    req.session.email = req.body.email;
    req.session.userId = id;
    res.status(200).json({
      msg: "succesfully logged in",
    });
  } else {
    res
      .status(401)
      .json({ msg: "Check your username and password to continue" });
  }
});

//VERIFICA SE USER è AUTENTICATO
app.get("/logged", async (req, res) => {
  let [found, names] = await getUserNames(req.session.email);

  if (req.session.logged && found) {
    res.status(200).json({
      userId: req.session.userId,
      admin: req.session.admin,
      puppyname: names.puppyname,
      username: names.username,
      puppyId: names.puppyId,
    });
  } else {
    res.status(401).json({ msg: "no logged" });
  }
});

//CREAZIONE USER
app.post("/create", async (req, res) => {
  const pw = bcrypt.hashSync(req.body.password, 10);
  const [createUser, output] = await create(
    req.body.name,
    req.body.username,
    req.body.puppyname,
    req.body.email,
    pw
  );
  if (createUser) {
    res.status(200).json({ status: true, msg: output });
  } else {
    res.status(401).json({ status: false, msg: output.errmsg });
  }
});

//UPLOAD IMAGE
const upload = multer();

//AGGIUNGE CUCCIOLO AL DB
app.post("/addPuppy", upload.single("file"), async (req, res) => {
  try {
    const compressedImage = await sharp(req.file.buffer)
      .resize({ width: 500 })
      .toBuffer();
    const puppy = JSON.parse(req.body.puppy);
    const [puppyProfileIsCreated, output] = await addPuppy(
      puppy.userId,
      puppy.puppyname,
      puppy.breed,
      puppy.age,
      puppy.gender,
      puppy.weight,
      puppy.description,
      compressedImage
      // puppyData.description,
    );
    if (puppyProfileIsCreated) {
      res.status(201).json({ msg: "puppy added succesfully", output });
    } else {
      res.status(400).json({ error: "failed to add puppy", details: output });
    }
  } catch (err) {
    console.error("Error adding puppy:", err);
    res.status(500).json({ error: "Internal server error", err });
  }
});

//PRENDE INFO CUCCIOLI
app.get("/details", async (req, res) => {
  try {
    let [found, user, data] = await getAllPuppies(req.session.userId);
    if (req.session.logged) {
      if (found) {
        let encodedImage = null;
        if (data.file) {
          encodedImage = base64Encode(data.file);
        }
        res.status(200).json({
          userId: req.session.userId,
          email: req.session.email,
          admin: req.session.admin,
          puppyname: user.puppyname,
          username: user.username,
          data,
          image: encodedImage,
        });
      } else {
        res
          .status(404)
          .json({ msg: "something went wrong, no puppy details found" });
      }
    } else {
      res.status(401).json({ msg: "no logged" });
    }
  } catch (error) {
    console.log("Error getting puppy details", error);
    res.status(500).json({ msg: "Internal server error. Check photo format" });
  }
});

//DELETE
app.delete("/newdetails/:id", async (req, res) => {
  try {
    const [isDeleted, deleteRes] = await deleteOwnPuppy(req.params.id);
    if (isDeleted) {
      res.status(200).json({ message: "Puppy successfully deleted" });
    } else {
      res.status(404).json({ message: "Puppy not found" });
    }
  } catch (error) {
    console.error("Error deleting puppy:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

//LOGOUT
app.put("/logout", (req, res) => {
  req.session.logged = false;
  req.session.email = "";
  res.status(200).json({ msg: "succesfull logout" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
