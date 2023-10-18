import { ObjectId } from "mongodb";

export interface ArticleItemFlag {
  _id: string;
  title: string;
  content: string;
  regDate: string;
  userName: string;
}