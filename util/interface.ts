import { ObjectId } from "mongodb";

export interface ArticleItemFlag {
  _id: ObjectId;
  title: string;
  content: string;
  regDate: string;
  userName: string;
}