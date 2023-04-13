import PostModel from '../../models/post/PostModel.js';
import PostDto from '../../dtos/PostDto/PostDto.js';


class PostService {
    async getAllPosts(): Promise<PostDto[]> {
        const posts = await PostModel.find().exec();
        
        return posts.map((post) => new PostDto(post));
    }
}

export default new PostService();
