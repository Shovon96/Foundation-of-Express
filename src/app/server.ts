import { MongoClient, ServerApiVersion } from "mongodb";
import app from "./app";

let server;
const port = 5000;

// Connect to MongoDB
const uri = "mongodb+srv://todoDB:bnadirWmlyyLIcle@cluster0.riywk8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const serverListner = async () => {
  await client.connect();
  console.log("MongoDB connected Successfully!")
  server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

serverListner();