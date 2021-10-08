export const mutations = {
	deleteTestUser: (email) => {
		return `mutation{
              deleteTestUser(email:"${email}"){
                userEmail
                message
              }
            }`
	},
	registerTestUser: (validUser) => {
		return `mutation register{
        register(
          user: { firstName: "${validUser.firstName}", lastName: "${validUser.lastName}", email: "${validUser.email}", password: "${validUser.password}" }
        ) {
          user {
            id
            firstName
            lastName
            email
          }
          auth {
            accessToken
            refreshToken
          }
        }
      }`
	},
}
