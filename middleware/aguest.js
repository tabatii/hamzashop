export default function ({app, redirect}) {
	if (app.$cookies.get('at')) {
		redirect('/admin/dashboard')
	}
}
