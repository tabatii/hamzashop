<template>
	<div>
		<section class="bg"></section>
		<section class="mb-16">
			<v-container>
				<v-row>
					<v-col class="pr-12" cols="7">
						<div>
							<v-text-field
								v-model="form.name"
								:label="$lang('address.form.name')"
								:error-messages="errors.name"
								outlined autofocus
							/>
							<v-text-field
								v-model="form.street"
								:label="$lang('address.form.street')"
								:error-messages="errors.street"
								outlined
							/>
							<v-text-field
								v-model="form.details"
								:error-messages="errors.details"
								:placeholder="$lang('address.form.details')"
								outlined
							/>
							<v-select
								v-model="form.country"
								:label="$lang('address.form.country')"
								:error-messages="errors.country"
								item-value="region"
								item-text="region"
								:items="rates"
								outlined
							/>
							<v-row dense>
								<v-col md="6" class="py-0">
									<v-text-field
										v-model="form.city"
										:label="$lang('address.form.city')"
										:error-messages="errors.city"
										outlined
									/>
								</v-col>
								<v-col md="6" class="py-0">
									<v-text-field
										v-model="form.zip"
										:label="$lang('address.form.zip')"
										:error-messages="errors.zip"
										outlined
									/>
								</v-col>
							</v-row>
							<v-text-field
								v-model="form.mobile"
								:label="$lang('address.form.mobile')"
								:error-messages="errors.mobile"
								outlined
							/>
						</div>
					</v-col>
					<v-divider vertical inset></v-divider>
					<v-col class="pl-12" cols="5">
						<product-bill :product="product" :shipping="shipping.price"></product-bill>
						<v-btn color="primary" :loading="loading" block depressed x-large @click="next">
							{{ $lang('address.form.submit') }}
						</v-btn>
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
			title: 'Your bill'
		},
		watch: {
			'form.country' (newValue) {
				this.shipping = this.rates.find(rate => rate.region === newValue)
				this.$cookies.set('s', this.shipping.id, { path: '/' })
			}
		},
		methods: {
			next () {
				this.loading = true
				this.$axios.$post('/addresses', this.form)
				.then(response => {
					this.$cookies.set('a', response.address, { path: '/' })
					this.$router.push('/products/payment')
				}).catch(error => {
					this.loading = false
					this.errors = error.response.data.errors
				})
			}
		},
		async asyncData ({app, $axios}) {
			let product = await $axios.$get(`/products/${app.$cookies.get('p')}`)
			let rates = await $axios.$get('/shipping')
			return {
				product: product.data,
				rates: rates.data
			}
		},
		data () {
			return {
				loading: false,
				shipping: {},
				product: {},
				errors: {},
				rates: {},
				form: {
					name: null,
					street: null,
					details: null,
					country: null,
					city: null,
					zip: null,
					mobile: null
				}
			}
		},
		created () {
			let result = this.rates.find(rate => rate.id === this.$cookies.get('s'))
			this.form.country = result.region
			this.shipping = result
		}
	}
</script>
