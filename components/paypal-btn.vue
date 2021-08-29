<template>
	<div>
		<div ref="paypal"></div>
	</div>
</template>

<script>
	export default {
		computed: {
			headers () {
				return {
					'Authorization': 'Bearer ' + this.$cookies.get('ut'),
					'content-type': 'application/json'
				}
			}
		},
		methods: {
			paypal () {
				paypal.Buttons({
					style: {
						layout: 'horizontal',
						tagline: 'false',
						height: 52,
					},
					createOrder: () => {
						return fetch(`${process.env.API_URL}/paypal/create`, {
							method: 'POST',
							headers: this.headers,
							body: JSON.stringify({
								product: this.$cookies.get('p'),
								quantity: this.$cookies.get('q')
							})
						}).then(response => {
							return response.json()
						}).then(response => {
							return response.result.id
						})
					},
					onApprove: (data) => {
						return fetch(`${process.env.API_URL}/paypal/capture`, {
							method: 'POST',
							headers: this.headers,
							body: JSON.stringify({
								order: data.orderID,
								product: this.$cookies.get('p'),
								address: this.$cookies.get('a'),
								quantity: this.$cookies.get('q')
							})
						}).then(response => {
							this.$router.replace(`/products/${this.$cookies.get('p')}`)
						})
					}
				}).render(this.$refs.paypal)
			}
		},
		mounted () {
			let script = document.createElement('script')
			script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_KEY}`
			document.body.appendChild(script)
			script.addEventListener('load', () => {
				this.paypal()
			})
		}
	}
</script>
