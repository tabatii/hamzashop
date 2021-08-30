<template>
	<div>
		<section class="bg"></section>
		<section class="pb-0">
			<v-container>
				<v-row>
					<v-col cols="6">
						<v-sheet outlined>
							<v-carousel height="auto" hide-delimiters show-arrows-on-hover>
								<v-carousel-item v-for="(img, i) in product.images" :key="i">
										<v-img :src="img" lazy-src="/template/placeholder.png" />
								</v-carousel-item>
							</v-carousel>
						</v-sheet>
					</v-col>
					<v-col cols="6">
						<h1 class="text-h4 text-capitalize mb-4" v-text="product.title"></h1>
						<div class="text-h3 font-weight-light error--text mb-8">
							<span v-text="$convert(product.price)"></span>
							<span v-text="$cookies.get('cc')"></span>
						</div>
						<div class="mb-8">
							<v-btn :to="`/products/${products.usa}`" class="mr-2" depressed>USA</v-btn>
							<v-btn :to="`/products/${products.spain}`" class="mr-2" depressed>Spain</v-btn>
						</div>
						<ul class="mb-16">
							<li class="text-capitalize" v-for="(feature, i) in product.features" :key="i" v-text="feature"></li>
						</ul>
						<div class="d-flex">
							<v-sheet class="mr-2" width="130">
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
							<v-btn color="primary" height="56" depressed x-large @click="buy">Buy now</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</section>
		<section class="mb-16">
			<v-container>
				<h3 class="text-h5">Product Description</h3>
				<div class="line mb-6" style="width:50px"></div>
				<div v-html="product.description"></div>
			</v-container>
		</section>
	</div>
</template>

<script>
	export default {
		head: {
			title: 'Product'
		},
		methods: {
			buy () {
				this.$cookies.set('p', this.product.id, { path: '/' })
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
			let products = await $axios.$get('/home')
			return {product, products}
		},
		data () {
			return {
				products: {},
				product: {},
				qty: 1
			}
		}
	}
</script>

<style scoped>
	.qty >>> input {
		text-align: center !important;
	}
</style>
