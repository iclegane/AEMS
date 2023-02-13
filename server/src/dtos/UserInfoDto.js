class UserInfoDto {
    name;
    email;
    birth_date;
    work_date;
    phone;
    address;
    vacation_count;
    gender;
    underground;
    employment;
    post;
    skill;

    constructor(model) {
        this.name = model.name;
        this.email = model.email;
        this.birth_date = model.birth_date;
        this.work_date = model.work_date;
        this.phone = model.phone;
        this.address = model.address;
        this.vacation_count = model.vacation_count;
        this.gender = model.gender_id?.name || null;
        this.underground = model.underground_id?.name || null;
        this.employment = model.employment_id?.name || null;
        this.post = model.post_id?.name || null;
        this.skill = model.skill_ids.map((skill) => skill.name) || [];
    }
}

module.exports = UserInfoDto;
