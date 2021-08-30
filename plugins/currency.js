export default function ({app}, inject) {
	inject('convert', amount => {
		if (app.$cookies.get('cc') !== 'MAD') {
			let result = amount * app.$cookies.get('cr')
			return result.toFixed(2)
		}
		return amount
	})
}
