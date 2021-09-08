<template>
	<div>
		<section class="intro bg pa-0">
			<v-container>
				<div class="d-flex justify-end">
					<img src="/template/header.png" :height="height" />
				</div>
				<div class="intro-text">
					<h3 class="text-h4 text-lg-h2 mb-4" v-text="$lang('home.intro.title')"></h3>
					<p class="text-h6 text-lg-h5 font-weight-light px-1 mb-6" v-text="$lang('home.intro.text')"></p>
					<div v-if="products.data.length">
						<v-btn :to="`/products/${products.data[0].id}`" class="mx-1" color="primary" rounded depressed x-large nuxt>
							{{ $lang('home.intro.btn') }}
						</v-btn>
					</div>
				</div>
			</v-container>
		</section>
		<section>
			<v-container>
				<h3 class="text-h4 text-center" v-text="$lang('home.products.title')">Our Products</h3>
				<div class="line mx-auto mb-6" style="width:50px"></div>
				<v-row class="mb-16">
					<v-col lg="4" class="pa-8" v-for="product in products.data" :key="product.id">
						<v-hover>
							<template v-slot:default="{ hover }">
								<div style="position:relative">
									<v-img :src="product.images[0].url" lazy-src="/template/placeholder.png" width="100%" />
									<div class="text-center pa-4 pt-0">
										<p class="text-h5 font-weight-light" v-text="product.shortTitle"></p>
										<p class="text-h6 font-weight-light error--text">
											<span v-text="$currency(product.price)"></span>
											<span v-text="$cookies.get('cc')"></span>
										</p>
									</div>
									<v-scroll-x-transition>
										<v-overlay v-if="hover" color="primary" opacity="0.3" absolute>
											<v-btn :to="`/products/${product.id}`" color="primary" fab><v-icon>mdi-eye</v-icon></v-btn>
										</v-overlay>
									</v-scroll-x-transition>
								</div>
							</template>
						</v-hover>
					</v-col>
				</v-row>
			</v-container>
		</section>
		<div class="bg">
			<v-row no-gutters>
				<v-col lg="6">
					<div class="video-player">
						<v-img src="/template/main-1.png" width="100%" />
						<v-icon class="play-icon" color="white" size="92">mdi-play-circle-outline</v-icon>
					</div>
				</v-col>
				<v-col lg="6" class="d-flex align-center px-16 py-16 py-lg-0">
					<div style="max-width:60%">
						<h3 class="text-h4" v-text="$lang('home.video.title')"></h3>
						<div class="line mb-6" style="width:50px"></div>
						<p v-text="$lang('home.video.text')"></p>
						<v-dialog v-model="dialog" width="853">
							<template v-slot:activator="{ on, attrs }">
								<v-btn color="primary" depressed large v-bind="attrs" v-on="on">{{ $lang('home.video.btn') }}</v-btn>
							</template>
							<v-sheet height="480">
								<iframe ref="iframe" width="100%" height="100%" src="https://www.youtube.com/embed/W41tiLTQop4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
							</v-sheet>
						</v-dialog>
					</div>
				</v-col>
			</v-row>
		</div>
		<section>
			<v-container class="py-16">
				<v-row>
					<v-col sm="12" lg="6" class="order-lg-2 pa-xl-8">
						<v-img src="/template/main-2.jpg" lazy-src="/template/placeholder.png" aspect-ratio="4/3" width="100%" />
					</v-col>
					<v-col sm="12" lg="6" class="d-flex align-center order-lg-1 pa-xl-8">
						<div>
							<h3 class="text-h4" v-text="$lang('home.steps.title')"></h3>
							<div class="line mb-8" style="width:50px"></div>
							<div>
								<div class="d-flex">
									<span><v-icon color="primary" size="20">mdi-checkbox-blank-circle</v-icon></span>
									<p class="ml-4" v-text="$lang('home.steps.list.0')"></p>
								</div>
								<div class="d-flex">
									<span><v-icon color="primary" size="20">mdi-checkbox-blank-circle</v-icon></span>
									<p class="ml-4" v-text="$lang('home.steps.list.1')"></p>
								</div>
								<div class="d-flex">
									<span><v-icon color="primary" size="20">mdi-checkbox-blank-circle</v-icon></span>
									<p class="ml-4" v-text="$lang('home.steps.list.2')"></p>
								</div>
								<div class="d-flex">
									<span><v-icon color="primary" size="20">mdi-checkbox-blank-circle</v-icon></span>
									<p class="ml-4" v-text="$lang('home.steps.list.3')"></p>
								</div>
								<div class="d-flex">
									<span><v-icon color="primary" size="20">mdi-checkbox-blank-circle</v-icon></span>
									<p class="ml-4" v-text="$lang('home.steps.list.4')"></p>
								</div>
								<div class="d-flex">
									<span><v-icon color="primary" size="20">mdi-checkbox-blank-circle</v-icon></span>
									<p class="ml-4" v-text="$lang('home.steps.list.5')"></p>
								</div>
							</div>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</section>
		<section class="bg">
			<v-container>
				<h3 class="text-h4 text-center" v-text="$lang('home.newsletter.title')"></h3>
				<div class="line mx-auto mb-12" style="width:50px"></div>
				<v-row justify="center">
					<v-col lg="6">
						<div class="d-flex">
							<v-text-field
								class="mr-2"
								v-model="form.email"
								:label="$lang('home.newsletter.input')"
								:error-messages="errors.email"
								filled rounded
							/>
							<v-btn color="primary" height="56" :loading="loading" depressed large rounded @click="newsletter">
								{{ $lang('home.newsletter.btn') }}
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
		head: {
			title: 'Home'
		},
		computed: {
			height () {
				if (this.$vuetify.breakpoint.smAndDown) {
					return '350px'
				} else if (this.$vuetify.breakpoint.mdAndDown) {
					return '450px'
				}
				return '550px'
			}
		},
		watch: {
			dialog (newValue, oldValue) {
				if (newValue === false) {
					let src = this.$refs.iframe.getAttribute('src')
					this.$refs.iframe.removeAttribute('src')
					this.$refs.iframe.setAttribute('src', src)
				}
			}
		},
		methods: {
			newsletter () {
				this.loading = true
				this.$axios.$post('/newsletter', this.form)
				.then(response => {
					this.reset()
				}).catch(error => {
					this.loading = false
					this.errors = error.response.data.errors
				})
			},
			reset () {
				this.form.email = null
				this.loading = false
				this.errors = {}
			}
		},
		async asyncData ({$axios}) {
			let products = await $axios.$get('/home')
			return {products}
		},
		data () {
			return {
				loading: false,
				dialog: false,
				products: {},
				errors: {},
				form: {
					email: null
				}
			}
		}
	}
</script>

<style scoped>
	.intro .container {
		position: relative;
		padding-bottom: 0;
	}
	.intro-text {
		position: absolute;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 60%;
	}
	.video-player {
		position: relative;
	}
	.video-player .play-icon {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
