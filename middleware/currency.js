export default function ({app, store, $axios}) {
	if (!app.$cookies.get('cr') || !app.$cookies.get('cc')) {
		app.$cookies.set('cc', 'MAD', { path: '/' })
		app.$cookies.set('cr', 1, { path: '/' })
	}
}
