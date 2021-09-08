<template>
	<div>
		<section class="bg"></section>
		<section class="pb-0">
			<v-dialog v-model="dialog" width="300" scrollable>
				<v-card>
					<v-card-text class="text--primary px-4 py-0" style="height:350px">
						<v-radio-group v-model="country">
							<v-radio :label="rate.country" :value="rate.country" v-for="(rate, i) in rates" :key="i"></v-radio>
						</v-radio-group>
					</v-card-text>
					<v-divider></v-divider>
        			<v-card-actions class="justify-end">
        				<v-btn color="secondary" @click="dialog = false">Close</v-btn>
        			</v-card-actions>
				</v-card>
			</v-dialog>
			<v-container>
				<v-row>
					<v-col lg="6">
						<v-sheet outlined>
							<v-carousel height="auto" hide-delimiters show-arrows-on-hover>
								<v-carousel-item v-for="(img, i) in product.images" :key="i">
										<v-img :src="img.url" lazy-src="/template/placeholder.png" />
								</v-carousel-item>
							</v-carousel>
						</v-sheet>
					</v-col>
					<v-col lg="6">
						<h1 class="text-h4 text-capitalize mb-4" v-text="product.longTitle"></h1>
						<div class="text-h3 font-weight-light error--text mb-8">
							<span v-text="$currency(product.price)"></span>
							<span v-text="$cookies.get('cc')"></span>
						</div>
						<div class="mb-8">
							<v-row no-gutters>
								<v-col cols="4">
									<p class="mb-0">{{ $lang('product.shipping.country') }} :</p>
									<p class="mb-0">{{ $lang('product.shipping.cost') }} :</p>
									<p class="mb-0">{{ $lang('product.shipping.time') }} :</p>
								</v-col>
								<v-col cols="8" v-if="Object.keys(active).length">
									<p class="mb-0">{{ active.country }}</p>
									<p class="mb-0">{{ $currency(active.price) }} {{ $cookies.get('cc') }}</p>
									<p class="mb-0">{{ active.min }}-{{ active.max }} ({{ $lang('product.shipping.days') }})</p>
								</v-col>
							</v-row>
						</div>
						<div class="d-flex mb-16">
							<v-sheet height="42px" class="mr-2" outlined rounded>
								<img src="/template/paypal.png" height="100%" />
							</v-sheet>
							<v-sheet height="42px" class="mr-2" outlined rounded>
								<img src="/template/visa.png" height="100%" />
							</v-sheet>
							<v-sheet height="42px" class="mr-2" outlined rounded>
								<img src="/template/mastercard.png" height="100%" />
							</v-sheet>
							<v-sheet height="42px" class="mr-2" outlined rounded>
								<img src="/template/amex.png" height="100%" />
							</v-sheet>
						</div>
						<div class="d-flex">
							<v-sheet max-width="130">
								<v-text-field
									class="qty"
									v-model.number="qty"
									prepend-inner-icon="mdi-minus"
									append-icon="mdi-plus"
									@click:prepend-inner="decrement"
									@click:append="increment"
									outlined readonly hide-details
								/>
							</v-sheet>
							<v-btn class="ml-2" height="56" depressed x-large @click="dialog = true">
								<span color="primary" class="pl-1" v-text="$lang('product.ship')"></span>
								<v-icon size="30">mdi-chevron-down</v-icon>
							</v-btn>
							<v-btn color="primary" class="ml-2" height="56" depressed x-large @click="buy">
								{{ $lang('product.buy') }}
							</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</section>
		<section class="mb-16">
			<v-container>
				<h3 class="text-h5" v-text="$lang('product.description.title')"></h3>
				<div class="line mb-6" style="width:50px"></div>
				<div v-html="product.description"></div>
			</v-container>
		</section>
	</div>
</template>

<script>
	export default {
		head () {
			return {
				title: this.product.shortTitle
			}
		},
		watch: {
			country (newValue) {
				this.active = this.rates.find(rate => rate.country === newValue)
				this.dialog = false
			}
		},
		methods: {
			buy () {
				this.$cookies.set('p', this.product.id, { path: '/' })
				this.$cookies.set('s', this.active.id, { path: '/' })
				this.$cookies.set('q', this.qty, { path: '/' })
				this.$router.push('/products/bill')
			},
			increment () {
				if (this.qty < this.product.stock)
					this.qty++
			},
			decrement () {
				if (this.qty > 1)
					this.qty--
			}
		},
		async asyncData ({params, $axios}) {
			let product = await $axios.$get(`/products/${params.id}`)
			let rates = await $axios.$get('/shipping')
			return {
				product: product.data,
				rates: rates.data
			}
		},
		data () {
			return {
				qty: 1,
				dialog: false,
				country: 'Morocco',
				product: {},
				active: {},
				rates: []
			}
		},
		created () {
			this.active = this.rates.find(rate => rate.country === this.country) || {}
		}
	}
</script>

<style scoped>
	.qty >>> input {
		text-align: center !important;
	}
</style>
