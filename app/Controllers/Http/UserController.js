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

    async login({ request, response, auth }) {
        try {
            
            const { email, password } = request.only(['email', 'password']);
            const token = await auth.attempt(email, password);
            const user = await this.getCurrentUser(email);

            return response.ok({ token, user });
        } catch (error) {
            console.log(error)
            return response.status(401).send({ message: 'Authentication failed' });
        }
    }

    async getCurrentUser(email) {

        const user = await Database
            .select('users.*', 'type_users.slug as type_user')
            .from('users')
            .innerJoin('type_users', 'type_users.id', 'users.id_type_user')
            .where('users.email', email)
            .first()

        return user
    }

    async perfil({auth}){

        const user = await Database
        .select('users.*', 'user_freelancers.id_speciality as especialidade')
        .from('users')
        .innerJoin('user_freelancers', ' users.id', 'user_freelancers.id_user')
        .where('users.id', auth.user.id)
        .first()
   
         return user

    }
}

module.exports = UserController
