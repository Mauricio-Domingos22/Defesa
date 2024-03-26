'use strict'

const UserFree = use('App/Models/UserFreelancer')
const UserComp = use('App/Models/UserCompany')
const User = use('App/Models/User')
const Database = use('Database');

class UserController {

    async store({ request, response }) {

        try {

            const userData = request.only(
                [
                    "fullname",
                    "binumber",
                    "phone",
                    "username",
                    "email",
                    "password",
                    "id_gender",
                    "id_city",
                    "id_type_user",
                    "id_speciality",
                    "name_company",
                    "nif"
                ])

            let id_speciality = userData.id_speciality || 1
            let name_company = userData.name_company
            let nif = userData.nif

            const typeUser = await Database.from('type_users').where('id', userData.id_type_user).first()

            delete userData.id_speciality
            delete userData.name_company
            delete userData.nif

            const user_email = await Database.select('*').from('users').where('email', userData.email).first()

            if (user_email) {

                return response.created({ message: 'Já existe um usuário com esse email', code: 201 })
            }

            const user = await User.create(userData)

            if (typeUser.slug === 'Freelancer') {
                await UserFree.create({ id_user: user.id, id_speciality: id_speciality });
            } else if (typeUser.slug === 'Empresa') {
                await UserComp.create({ id_user: user.id, name_company: name_company, nif: nif });
            }

            return response.created({ message: 'Usuário registado com sucesso', code: 200, data: user })

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = UserController
