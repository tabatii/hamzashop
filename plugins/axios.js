export default function ({app, $axios}) {
	$axios.setBaseURL('https://hamzashopapi.herokuapp.com/api')
	$axios.onRequest(config => {
		if (app.$cookies.get('ut'))
			$axios.setToken(app.$cookies.get('ut'), 'Bearer')
	})
}
