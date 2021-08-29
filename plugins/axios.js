export default function ({app, env, $axios}) {
	$axios.setBaseURL(env.API_URL)
	$axios.onRequest(config => {
		if (app.$cookies.get('ut'))
			$axios.setToken(app.$cookies.get('ut'), 'Bearer')
	})
}
