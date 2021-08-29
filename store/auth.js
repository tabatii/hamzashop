export const state = () => ({
	loggedIn: false,
	user: {}
})

export const mutations = {
	login (state, user) {
		state.loggedIn = true
		state.user = user
	},
	logout (state) {
		state.loggedIn = false
		state.user = {}
	}
}
