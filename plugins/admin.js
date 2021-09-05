export default function ({app, redirect, $config, $axios}, inject) {
	let admin = $axios.create()
	admin.setBaseURL($config.api)
	admin.onRequest(config => {
		if (app.$cookies.get('at')) {
			admin.setToken(app.$cookies.get('at'), 'Bearer')
		}
	})
	admin.onError(error => {
		let code = parseInt(error.response && error.response.status)
		if (code === 404) {
			redirect('/admin/404')
		}
	})
	inject('admin', admin)
}
