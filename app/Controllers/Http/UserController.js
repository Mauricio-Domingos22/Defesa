'use strict'

// const TypeUsers = use('App/Models/TypeUser')
// const UserFree = use ('App/Models/UserFreelancer')
// const UserComp = use ('App/Models/UserCompany')
const User = use('App/Models/User')

class UserController {

    async store({ request, response }) {

        const userData = request.only(["fullname", "binumber", "phone", "username", "email", "password", "id_gender", "id_city", "id_type_user"])

        console.log(userData)

        //  const type_use = await TypeUsers.findByOrFail('slug',slug)
        const user = await User.create(userData)
        //  const user = await type_use.users().create(userData)

        // if (slug === 'Freelancer') {
        //     await UserFree.create({ id_user: user.id,id_speciality});
        //   } else if (slug === 'Empresa') {
        //     await UserComp.create({ usuario_id: user.id,name_company,nif});
        //   }

        return user
        //     return response.created({
        //         status:true,
        //         data:user
        //     })
        // }
    }
}

module.exports = UserController
