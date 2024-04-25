import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import "dotenv/config";
import bcrypt from "bcrypt";
const uri = process.env.MONGODB_CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,

    strict: true,
    deprecationErrors: true,
  },
});

export async function login(email, password) {
  try {
    await connect();
    const res = await client
      .db("WonderWoof")
      .collection("users")
      .findOne({ email });
    let pwIsTrue = false;
    if (res.password) {
      pwIsTrue = await bcrypt.compare(password, res.password);
    }
    return [res != null, pwIsTrue, res];
  } catch (err) {
    return [false, false, err];
  } finally {
    await close();
  }
}

export async function getUserNames(email) {
  try {
    await connect();
    const names = await client
      .db("WonderWoof")
      .collection("users")
      .findOne({ email });
    return [names != null, names];
  } finally {
    await close();
  }
}

export async function create(name, username, puppyname, email, password) {
  try {
    await connect();
    const res = await client
      .db("WonderWoof")
      .collection("users")
      .insertOne({ name, username, puppyname, email, password });
    return [true, res.insertedId];
  } catch (err) {
    return [false, err];
  } finally {
    await close();
  }
}

export async function addPuppy(
  userId,
  puppyname,
  breed,
  age,
  gender,
  weight,
  description,
  file
) {
  try {
    await connect();
    const info = await client.db("WonderWoof").collection("puppies").insertOne({
      userId,
      puppyname,
      breed,
      age,
      gender,
      weight,
      description,
      file,
    });
    const puppyId = info.insertedId;
    await client
      .db("WonderWoof")
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: { puppiesId: puppyId } }
      );
    return [true, info];
  } catch (err) {
    return [false, err];
  } finally {
    await close();
  }
}

export async function getAllPuppies(userId) {
  try {
    await connect();
    const user = await client
      .db("WonderWoof")
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    const dbPuppies = await client
      .db("WonderWoof")
      .collection("puppies")
      .find()
      .toArray();
    const foundUserPuppy = dbPuppies.find((puppy) => puppy.userId === userId);
    const filteredPuppies = dbPuppies.filter(
      (puppy) => puppy.userId !== userId
    );
    if (foundUserPuppy) {
      return [user != null, user, [foundUserPuppy, ...filteredPuppies]];
    } else {
      return [user != null, user, [...filteredPuppies]];
    }
  } catch (err) {
    return [false, err];
  } finally {
    await close();
  }
}

export async function deleteOwnPuppy(idPuppy) {
  try {
    await connect();
    const res = await client
      .db("WonderWoof")
      .collection("puppies")
      .deleteOne({ _id: new ObjectId(idPuppy) });
    return [true, res.deletedCount];
  } catch (err) {
    return [false, err];
  } finally {
    await close();
  }
}

export async function isAdmin(userId) {
  try {
    await connect();
    const role = await client
      .db("WonderWoof")
      .collection("roles")
      .find({})
      .toArray();
    return role[0].admin === userId;
  } finally {
    await close();
  }
}

export async function connect() {
  await client.connect();
}
export async function close() {
  await client.close();
}
