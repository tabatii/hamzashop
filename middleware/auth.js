export default function ({store, redirect}) {
	if (store.state.auth.loggedIn === false) {
		redirect('/auth/login')
	}
}
