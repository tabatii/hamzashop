export default function ({app, redirect, $config, $axios}) {
	$axios.setBaseURL($config.api)
	$axios.onRequest(config => {
		if (app.$cookies.get('ut')) {
			$axios.setToken(app.$cookies.get('ut'), 'Bearer')
		}
	})
	$axios.onError(error => {
		let code = parseInt(error.response && error.response.status)
		if (code === 404) {
			redirect('/404')
		}
	})
}
