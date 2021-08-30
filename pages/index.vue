<template>
	<div>
		<section class="intro bg pa-0">
			<v-container>
				<div class="d-flex">
					<img src="/template/header.png" />
				</div>
				<div class="intro-text">
					<h3 class="text-h2 mb-4">Get your hair back.</h3>
					<p class="text-h5 font-weight-light px-1 mb-6">
						Minoxidil solution and foam are used to help hair growth in the treatment of male pattern baldness.
					</p>
					<div>
						<v-btn :to="`/products/${product}`" class="mx-1" color="primary" rounded depressed x-large nuxt>Shop now</v-btn>
					</div>
				</div>
			</v-container>
		</section>
		<section>
			<v-container>
				<v-row>
					<v-col cols="6">
						<v-img src="/template/main.jpg" lazy-src="/template/placeholder.png" width="100%" />
					</v-col>
					<v-col cols="6" class="d-flex flex-column justify-center pa-16">
						<div>
							<h3 class="text-h4">About Minoxidil.</h3>
							<div class="line mb-6" style="width:50px"></div>
							<p>
								Minoxidil is a medication used for the treatment of male-pattern hair loss. It is an antihypertensive vasodilator. It is available as a generic medication and over the counter.
							</p>
							<p>
								Minoxidil is scientifically proven to improve hair growth and potentially help men with male pattern baldness regrow lost hair. In the tests used to secure FDA approval, minoxidil was primarily tested on the top of the scalp and crown, resulting in a common belief that it only works on these areas.
							</p>
							<v-btn :to="`/products/${product}`" color="primary" depressed large nuxt>Shop now</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</section>
		<div class="bg">
			<v-row no-gutters>
				<v-col cols="6">
					<div class="video-player">
						<v-img src="/template/main-2.png" lazy-src="/template/placeholder.png" width="100%" />
						<v-icon class="play-icon" color="white" size="92">mdi-play-circle-outline</v-icon>
					</div>
				</v-col>
				<v-col cols="6" class="d-flex flex-column justify-center pa-16">
					<div style="max-width:60%">
						<h3 class="text-h4">How it works.</h3>
						<div class="line mb-6" style="width:50px"></div>
						<p>
							Watch this video by William Gaunitz to understand how does Minoxidil work for Hair Regrowth.
						</p>
						<v-dialog v-model="dialog" width="853">
							<template v-slot:activator="{ on, attrs }">
								<v-btn color="primary" depressed large v-bind="attrs" v-on="on">Watch video</v-btn>
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
					<v-col cols="6" class="d-flex flex-column justify-center">
						<div>
							<h3 class="text-h4">Easy to use.</h3>
							<div class="line mb-8" style="width:50px"></div>
							<div>
								<div class="d-flex">
									<span><v-icon color="primary" size="20">mdi-checkbox-blank-circle</v-icon></span>
									<p class="ml-4">Knowing how to use minoxidil correctly will lead to the best results (hello amazing head of hair!).</p>
								</div>
								<div class="d-flex">
									<span><v-icon color="primary" size="20">mdi-checkbox-blank-circle</v-icon></span>
									<p class="ml-4">First, make sure your hair and scalp are dry (you don’t need to shampoo before each application).</p>
								</div>
								<div class="d-flex">
									<span><v-icon color="primary" size="20">mdi-checkbox-blank-circle</v-icon></span>
									<p class="ml-4">Fill the dropper to the 1ML mark (that’s one dose).</p>
								</div>
								<div class="d-flex">
									<span><v-icon color="primary" size="20">mdi-checkbox-blank-circle</v-icon></span>
									<p class="ml-4">Apply the dose to the crown of your scalp. Pro tip: Make five to six parts in your hair and apply one drop along each part line.</p>
								</div>
								<div class="d-flex">
									<span><v-icon color="primary" size="20">mdi-checkbox-blank-circle</v-icon></span>
									<p class="ml-4">Once applied, you can rub it in.</p>
								</div>
								<div class="d-flex">
									<span><v-icon color="primary" size="20">mdi-checkbox-blank-circle</v-icon></span>
									<p class="ml-4">Avoid getting your hair wet for at least four hours after applying.</p>
								</div>
							</div>
						</div>
					</v-col>
					<v-col cols="6">
						<v-img src="/template/main-3.jpg" lazy-src="/template/placeholder.png" aspect-ratio="4/3" width="100%" />
					</v-col>
				</v-row>
			</v-container>
		</section>
		<section class="bg">
			<v-container>
				<h3 class="text-h4 text-center">Join Our Newsletter</h3>
				<div class="line mx-auto mb-12" style="width:50px"></div>
				<v-row justify="center">
					<v-col cols="6">
						<div class="d-flex">
							<v-text-field
								class="mr-2"
								label="Your email"
								v-model="form.email"
								:error-messages="errors.email"
								filled rounded
							/>
							<v-btn color="primary" height="56" :loading="loading" depressed large rounded @click="newsletter">Subscribe</v-btn>
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
			let product = await $axios.$get('/home')
			return {product}
		},
		data () {
			return {
				loading: false,
				dialog: false,
				product: null,
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
	.intro img {
		height: 550px;
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
