export default function ({app}, inject) {
	inject('lang', path => {
		let props = path.split('.')
		let cookie = app.$cookies.get('lg')
		let lang = cookie ? require(`../languages/${cookie}.js`) : require(`../languages/en.js`)
		return props.reduce((previous, current) => previous && previous[current], lang)
	})
}
