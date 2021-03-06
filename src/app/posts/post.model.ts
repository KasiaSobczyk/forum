export interface Post {
  id: string;
  title: string;
  content: string;
  imagePath: string;
  creator: string;
  username: string;
  // updated_date?: { type: Date, default: Date.now },
  likes?: number;
  comments?: [{
    comment: string;
    commentator: string;
  }]
}
