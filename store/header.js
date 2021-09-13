export const state = () => ({
	notifications: 0,
	messages: 0
})

export const mutations = {
	notifications (state, count) {
		state.notifications = count
	},
	messages (state, count) {
		state.messages = count
	}
}
