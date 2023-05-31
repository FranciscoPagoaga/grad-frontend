export interface CommentModel{
    _id: string;
    userId: string;
    postId: string;
    user: string;
    name: string; 
    content: string;
    userPicturePath: string;
}