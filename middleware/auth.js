export default function ({app, redirect}) {
	if (!app.$cookies.get('ut')) {
		redirect('/auth/login')
	}
}
