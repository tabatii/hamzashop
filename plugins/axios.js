export default function ({app, $axios}) {
	$axios.setBaseURL(process.env.API_URL)
	$axios.onRequest(config => {
		if (app.$cookies.get('ut'))
			$axios.setToken(app.$cookies.get('ut'), 'Bearer')
	})
}
