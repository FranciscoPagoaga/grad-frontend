
export interface PostModel {
  _id: string;
  userId: string;
  name: string;
  user: string;
  content: string;
  enabled: boolean;
  likes: Record<string, boolean>;
  rating: Record<string, number>;
  picturePath: string;
  userPicturePath: string;
  watchtime: [];
}
