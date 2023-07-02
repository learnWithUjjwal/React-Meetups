// /api/meetup/new
import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { title, image, description, address } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://laravelujjwal:mJmnXX6cd0DzmKvK@cluster0.zm406wu.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne({
      title,
      image,
      address,
      description,
    });

    client.close();
    return res.status(201).json({ message: "Meetup inserted" });
  }
}
