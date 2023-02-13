class UserDto {
    id;
    email;
    role;
    post;
    isActivated;

    constructor(model) {
        this.id = model._id;
        this.role = model.role_id?.name || null;
        this.email = model.email;
        this.post = model.post;
        this.isActivated = model.isActivated;
    }
}

module.exports = UserDto;
