<template>
	<div>
		<section class="bg"></section>
		<section class="mb-16">
			<v-container>
				<v-row>
					<v-col cols="12" lg="7" class="pr-lg-12">
						<div>
							<div>
								<div class="font-weight-medium">{{ $lang('payment.address.title') }} :</div>
								<div class="text--secondary">
									<span class="text-capitalize" v-text="address.street"></span>,
									<span class="text-capitalize" v-text="address.city"></span>,
									<span class="text-capitalize" v-text="address.zip"></span>,
									<span class="text-capitalize" v-text="shipping.country"></span>.
								</div>
							</div>
							<v-divider class="my-8"></v-divider>
							<div>
								<v-radio-group v-model="method">
									<v-radio value="card" class="mb-6">
										<template v-slot:label>
											<div class="d-flex flex-wrap">
												<v-sheet height="42px" class="mr-2 my-1" outlined rounded>
													<img src="/template/visa.png" height="100%" />
												</v-sheet>
												<v-sheet height="42px" class="mr-2 my-1" outlined rounded>
													<img src="/template/mastercard.png" height="100%" />
												</v-sheet>
												<v-sheet height="42px" class="mr-2 my-1" outlined rounded>
													<img src="/template/amex.png" height="100%" />
												</v-sheet>
												<v-sheet height="42px" class="mr-2 my-1" outlined rounded>
													<img src="/template/discover.png" height="100%" />
												</v-sheet>
												<v-sheet height="42px" class="mr-2 my-1" outlined rounded>
													<img src="/template/jcb.png" height="100%" />
												</v-sheet>
											</div>
										</template>
									</v-radio>
									<v-radio value="paypal" class="mb-6">
										<template v-slot:label>
											<div class="d-flex">
												<v-sheet height="42px" outlined rounded>
													<img src="/template/paypal.png" height="100%" />
												</v-sheet>
											</div>
										</template>
									</v-radio>
									<v-radio value="cash" v-if="address.country === 'MA'">
										<template v-slot:label>
											<div class="d-flex">
												<p class="text--primary mb-0" v-text="$lang('payment.methods.cash')"></p>
											</div>
										</template>
									</v-radio>
								</v-radio-group>
							</div>
						</div>
					</v-col>
					<v-divider class="d-none d-lg-inline-flex" vertical inset></v-divider>
					<v-col cols="12" lg="5" class="pl-lg-12">
						<product-bill :product="product" :shipping="shipping.price"></product-bill>
						<div v-if="method === 'card'">
							<paymentwall></paymentwall>
						</div>
						<div v-else-if="method === 'paypal'" style="height:52px">
							<paypal></paypal>
						</div>
						<div v-else-if="method === 'cash'">
							<v-btn color="secondary" :loading="loading" block depressed x-large @click="order">
								{{ $lang('payment.submit') }}
							</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</section>
	</div>
</template>

<script>
	export default {
		middleware: 'auth',
		head: {
			title: 'Payment'
		},
		methods: {
			order () {
				this.loading = true
				this.$axios.$post('/orders', {
					product: this.$cookies.get('p'),
					address: this.$cookies.get('a'),
					quantity: this.$cookies.get('q')
				}).then(response => {
					this.$router.replace(`/products/${this.$cookies.get('p')}`)
				})
			}
		},
		async asyncData ({app, $axios}) {
			let shipping = await $axios.$get(`/shipping/${app.$cookies.get('s')}`)
			let address = await $axios.$get(`/addresses/${app.$cookies.get('a')}`)
			let product = await $axios.$get(`/products/${app.$cookies.get('p')}`)
			return {
				shipping: shipping.data,
				address: address.data,
				product: product.data
			}
		},
		data () {
			return {
				loading: false,
				method: 'card',
				shipping: {},
				address: {},
				product: {}
			}
		}
	}
</script>
