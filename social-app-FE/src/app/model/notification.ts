import { Post } from "./post";
import { User } from "./user";
import { Comment } from "./comment";

export class Notification {
	id!: number;
	type!: string;
	receiver!: User;
	sender!: User;
	owningPost: Post;
	owningComment: Comment;
	isSeen: boolean;
	isRead: boolean;
	dateCreated: string;
	dateUpdated: string;
	dateLastModified: string;
}