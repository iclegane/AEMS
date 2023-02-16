const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');


class ProfileController {
    async getProfileInfo(req, res, next) {
        try {
            // const {refreshToken} = req.cookies;
            // const {id} = TokenService.validateRefreshToken(refreshToken);
            const userID = req.body.id;
            const user = await UserService.getUserInfoById(userID);

            const profileDto = {
                main: [
                    {
                        name: 'Почта',
                        value: user.email,
                    }, {
                        name: 'Телефон',
                        value: user.phone,
                    }, {
                        name: 'Дата найма',
                        value: user.work_date,
                    }, {
                        name: 'Вид занятости',
                        value: user.employment,
                    }
                ],
                personal: [
                    {
                        name: 'Имя',
                        value: user.name,
                    }, {
                        name: 'Фамилия',
                        value: user.name,
                    }, {
                        name: 'Отчество',
                        value: user.name,
                    }, {
                        name: 'Электронная почта',
                        value: user.email,
                    }, {
                        name: 'Дата рождения',
                        value: user.birth_date,
                    }, {
                        name: 'Пол',
                        value: user.gender,
                    },
                ],
                contacts: [
                    {
                        name: 'Почта',
                        value: user.email,
                    }, {
                        name: 'Телефон',
                        value: user.phone,
                    }, {
                        name: 'Адрес',
                        value: user.address,
                    }, {
                        name: 'метро',
                        value: user.underground,
                    },
                ]
            }

            return res.json(profileDto)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProfileController();
