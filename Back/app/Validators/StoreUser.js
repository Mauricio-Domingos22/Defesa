'use strict'
const {formatters} = use('Validator')
class StoreUser {
  get rules () {
    return {
    email: 'required|email|max:180|unique:users,email',
    password: 'required|max:39'
    }
  }

  get validateAll(){
    return true
  }

  get formatter(){
    return formatters.JsonApi
  }
}

module.exports = StoreUser
