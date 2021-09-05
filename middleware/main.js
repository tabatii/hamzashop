export default function ({app, store, $axios}) {
	if (app.$cookies.get('ut') && store.state.auth.loggedIn === false) {
		return $axios.$get('/auth/me').then(user => {
			store.commit('auth/login', user)
		}).catch(error => {
			if (error.response.status === 401) {
				app.$cookies.remove('ut')
			}
		})
	} else if (!app.$cookies.get('ut') && store.state.auth.loggedIn === true) {
		store.commit('auth/logout')
	}
}
