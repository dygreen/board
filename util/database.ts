import { MongoClient } from "mongodb";

declare global {
  var _mongo: Promise<MongoClient> | undefined;
}

let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(process.env.NEXT_PUBLIC_URL as string).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(process.env.NEXT_PUBLIC_URL as string).connect();
}

export { connectDB };
