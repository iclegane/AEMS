import {NextFunction, Request, Response} from 'express';
import PostService from '../service/Post/PostService.js';


class PostController {
    getPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await PostService.getAllPosts();
            
            res.json(posts);
        } catch (e) {
            next(e);
        }
    };
}

export default new PostController();
