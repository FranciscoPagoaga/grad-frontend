export interface User {
    _id: string,
    name: string,
    email: string,
    user: string,
    password: string,
    following: [],
    followers: [],
    biography?: string,
    profilephoto: string,
    enable: boolean,
    createdAt: string,
    updatedAt: string,
}