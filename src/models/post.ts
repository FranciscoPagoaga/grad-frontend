interface Comment {
  commentId: string;
  userId: string;
  content: string;
  enabled: boolean;
  picturePath: string;
}

export interface PostModel {
  _id: string;
  userId: string;
  name: string;
  user: string;
  content: string;
  enabled: boolean;
  comments: Comment[];
  likes: Record<string, boolean>;
  picturePath: string;
  userPicturePath: string;
  watchtime: [];
}
