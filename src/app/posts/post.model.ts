export interface Post {
  id: string;
  title: string;
  content: string;
  imagePath: string;
  creator: string;
  username: string;
  // updated_date?: { type: Date, default: Date.now },
  // voteAmount: number;
  likes?: number;
  dislikes?: number;
}
