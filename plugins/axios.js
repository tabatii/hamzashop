export default function ({app, $config, $axios}) {
	$axios.setBaseURL($config.api)
	$axios.onRequest(config => {
		if (app.$cookies.get('ut')) {
			$axios.setToken(app.$cookies.get('ut'), 'Bearer')
		}
	})
}
