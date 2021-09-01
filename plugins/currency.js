export default function ({app}, inject) {
	inject('currency', amount => {
		if (!app.$cookies.get('cc') || app.$cookies.get('cc') === 'MAD') {
			return amount
		}
		return (amount * app.$cookies.get('cr')).toFixed(2)
	})
}
