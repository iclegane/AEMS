import { IPostDocument } from '../../models/post/types';


class PostDto {
    id: string;
    
    name: string;
    
    constructor(model: IPostDocument) {
        this.id = model.id as string;
        this.name = model.name;
    }
}

export default PostDto;
