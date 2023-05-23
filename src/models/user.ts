export interface User {
    _id: string,
    name: string,
    email: string,
    user: string,
    password: string,
    following: string[],
    followers: string[],
    biography: string,
    picturePath: string,
    enabled: boolean,
    createdAt: string,
    updatedAt: string,
}