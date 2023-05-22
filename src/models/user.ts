export interface User {
    _id: string,
    name: string,
    email: string,
    user: string,
    password: string,
    following: any[],
    followers: any[],
    biography: string,
    picturePath: string,
    enabled: boolean,
    createdAt: string,
    updatedAt: string,
}