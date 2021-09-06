export default function ({app}) {
	if (!app.$cookies.get('s')) {
		app.$cookies.set('s', 'Morocco', { path: '/' })
	}
}
