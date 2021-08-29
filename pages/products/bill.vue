<template>
	<div>
		<section class="bg"></section>
		<section class="mb-16">
			<v-container>
				<v-row>
					<v-col class="pr-12" cols="7">
						<div>
							<v-text-field
								label="Full name"
								v-model="form.name"
								:error-messages="errors.name"
								outlined autofocus
							/>
							<v-text-field
								label="Street"
								v-model="form.street"
								:error-messages="errors.street"
								outlined
							/>
							<v-text-field
								placeholder="Apartment, suite, floor, etc. (Optional)"
								v-model="form.details"
								:error-messages="errors.details"
								outlined
							/>
							<v-select
								label="Country"
								v-model="form.country"
								:error-messages="errors.country"
								:items="countries"
								outlined
							/>
							<v-row dense>
								<v-col md="6" class="py-0">
									<v-text-field
										label="City / Town"
										v-model="form.city"
										:error-messages="errors.city"
										outlined
									/>
								</v-col>
								<v-col md="6" class="py-0">
									<v-text-field
										label="Zip Code"
										v-model="form.zip"
										:error-messages="errors.zip"
										outlined
									/>
								</v-col>
							</v-row>
							<v-text-field
								label="Mobile"
								v-model="form.mobile"
								:error-messages="errors.mobile"
								outlined
							/>
						</div>
					</v-col>
					<v-divider vertical inset></v-divider>
					<v-col class="pl-12" cols="5">
						<product-bill :product="product"></product-bill>
						<v-btn color="primary" :loading="loading" block depressed x-large @click="next">Continue</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</section>
	</div>
</template>

<script>
	import { getNames } from 'country-list'
	export default {
		middleware: 'auth',
		head: {
			title: 'Your bill'
		},
		computed: {
			countries () {
				return getNames().sort()
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
			return {product}
		},
		data () {
			return {
				loading: false,
				product: {},
				errors: {},
				form: {
					name: null,
					street: null,
					details: null,
					country: 'Morocco',
					city: null,
					zip: null,
					mobile: null
				}
			}
		}
	}
</script>
