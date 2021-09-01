<template>
	<div>
		<section class="bg"></section>
		<section class="mb-16">
			<v-container>
				<v-row>
					<v-col class="pr-12" cols="7">
						<div>
							<div>
								<div class="font-weight-medium">{{ $lang('payment.address.title') }} :</div>
								<div class="text--secondary">
									<span class="text-capitalize" v-text="address.street"></span>,
									<span class="text-capitalize" v-text="address.city"></span>,
									<span class="text-capitalize" v-text="address.zip"></span>,
									<span class="text-capitalize" v-text="address.country"></span>.
								</div>
							</div>
							<v-divider class="my-8"></v-divider>
							<div>
								<v-radio-group v-model="method">
									<v-radio value="card" class="mb-6">
										<template v-slot:label>
											<div class="d-flex">
												<v-sheet height="42px" outlined rounded>
													<img src="/template/visa.png" height="100%" />
												</v-sheet>
												<v-sheet height="42px" class="ml-2" outlined rounded>
													<img src="/template/mastercard.png" height="100%" />
												</v-sheet>
												<v-sheet height="42px" class="ml-2" outlined rounded>
													<img src="/template/amex.png" height="100%" />
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
									<v-radio value="cash" v-if="address.country === 'Morocco'">
										<template v-slot:label>
											<div class="d-flex">
												<v-sheet height="42px" outlined rounded>
													<img src="/template/cash.png" height="100%" />
												</v-sheet>
											</div>
										</template>
									</v-radio>
								</v-radio-group>
							</div>
						</div>
					</v-col>
					<v-divider vertical inset></v-divider>
					<v-col class="pl-12" cols="5">
						<product-bill :product="product"></product-bill>
						<div v-if="method === 'card'">
							<card-btn></card-btn>
						</div>
						<div v-else-if="method === 'paypal'" style="height:52px">
							<paypal-btn></paypal-btn>
						</div>
						<div v-else-if="method === 'cash'">
							<v-btn color="primary" :loading="loading" block depressed x-large @click="order">
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
			let product = await $axios.$get(`/products/${app.$cookies.get('p')}`)
			let address = await $axios.$get(`/addresses/${app.$cookies.get('a')}`)
			return {product, address}
		},
		data () {
			return {
				loading: false,
				method: 'card',
				product: {},
				address: {}
			}
		}
	}
</script>
