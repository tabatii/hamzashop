export default function ({app, store, $axios}) {
	if (app.$cookies.get('ut') && store.state.auth.loggedIn === false) {
		return $axios.$get('/auth/me').then(user => {
			store.commit('auth/login', user)
		})
	} else if (! app.$cookies.get('ut') && store.state.auth.loggedIn === true) {
		store.commit('auth/logout')
	}
}
