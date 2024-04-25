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
// Gestisci le richieste OPTIONS
app.options("*", cors()); // Risponde a tutte le richieste OPTIONS con le intestazioni CORS appropriate

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
    // console.log("server nologged row46:", res.json());
    res.status(401).json({ msg: "no logged" });
  }
  //ragionavo sul next qui
});

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
    // let admin = profile[0].admin === id;
    res.status(200).json({
      msg: "succesfully logged in",
    });
  } else {
    res
      .status(401)
      .json({ msg: "Check your username and password to continue" });
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
// app.post("/upload");
const upload = multer();
// Limita la dimensione del file a 3 MB
// {
//   limits: { fileSize: 7 * 1024 * 1024 },
// }

//AGGIUNGE CUCCIOLO AL DB
app.post("/addPuppy", upload.single("file"), async (req, res) => {
  // console.log("Request file:", JSON.stringify(req.file));
  // app.post("/addPuppy", upload.single("file"), async (req, res) => {
  // const id = res._id.toString();
  // const { breed, age, gender, weight, photo, description } = req.body;
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
    console.log("Request body 143:", puppy.puppyname);
    console.log("Request file 144:", req.file);

    if (puppyProfileIsCreated) {
      console.log("riga 142 if:", puppyProfileIsCreated, output);
      res.status(201).json({ msg: "puppy added succesfully", output });
    } else {
      console.log("riga 145 else:", puppyProfileIsCreated, output);
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
          // if (data[0].file) {
          // Codifica il file in base64 utilizzando la funzione base64Encode
          // encodedImage = base64Encode(data[0].file);
          encodedImage = base64Encode(data.file);
        }
        console.log("Request body 171:", encodedImage);
        // const fileBuffer = data.file.buffer;
        // const encodedImage = fileBuffer.toString("base64");
        // const encodedImage = Buffer.from(data.file).toString(`base64`);

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
        console.log("Error getting puppy details primo else", data);
        res
          .status(404)
          .json({ msg: "something went wrong, no puppy details found" });
      }
    } else {
      // console.log("server nologged row46:", res.json());
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
// req.body.userId,
// req.body.puppyname,
// req.body.breed,
// req.body.age,
// req.body.gender,
// req.body.weight,
// req.body.photo,
// req.body.description
// puppyname: names.puppyname,
// username: names.username,
// breed: data.breed,
// age: data.age,
// gender: data.gender,
// weight: data.weight,
// url: data.photo,
// description: data.description,
