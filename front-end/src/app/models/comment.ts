import { User } from "./user";

export interface CommentRequest{
    userId: string;
    movieId: number;
    comment: string;
}

export interface Comment{
    id: string;
    comment: string;
    commentAt: Date;
    user: User;
}

