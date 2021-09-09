<template>
	<div class="pa-12">
		<v-row>
			<v-col cols="12" xl="9">
				<v-row class="ma-0">
					<v-col cols="12">
						<v-text-field
							label="Long title"
							v-model="form.long"
							:error-messages="errors.long"
							solo
						/>
					</v-col>
				</v-row>
				<v-row class="ma-0">
					<v-col cols="12" lg="6">
						<v-text-field
							label="Short title"
							v-model="form.short"
							:error-messages="errors.short"
							solo
						/>
					</v-col>
					<v-col cols="12" lg="3">
						<v-text-field
							label="Price"
							v-model="form.price"
							:error-messages="errors.price"
							suffix="MAD"
							solo
						/>
					</v-col>
					<v-col cols="12" lg="3">
						<v-text-field
							label="Stock"
							v-model="form.stock"
							:error-messages="errors.stock"
							solo
						/>
					</v-col>
				</v-row>
				<v-row class="gallery ma-0">
					<v-col cols="12">
						<v-sheet color="white" elevation="2">
							<v-row no-gutters>
								<v-col cols="6">
									<label>
										<input type="file" class="d-none" multiple accept="image/*" @change="upload" />
										<div>
											<v-icon color="secondary lighten-5" size="6rem">mdi-cloud-upload</v-icon>
											<p class="text--secondary">Product gallery</p>
										</div>
									</label>
								</v-col>
								<v-col cols="6">
									<v-row no-gutters>
										<v-col cols="4" v-for="(n, i) in 9" :key="i">
											<div class="item">
												<div class="delete" v-if="form.images[i] && form.images[i].url">
													<v-btn color="secondary" x-small fab @click="deleteImg(i)">
														<v-icon>mdi-close</v-icon>
													</v-btn>
												</div>
												<div class="progress" v-if="form.images[i] && !form.images[i].url">
													<v-progress-circular color="primary" indeterminate />
												</div>
												<v-img :src="form.images[i].url" v-else-if="form.images[i] && form.images[i].url" />
												<v-img src="/template/placeholder.png" v-else />
											</div>
										</v-col>
									</v-row>
								</v-col>
							</v-row>
						</v-sheet>
						<div class="error-wrapper">
							<span class="error-text" v-if="errors.images" v-text="errors.images[0]"></span>
						</div>
					</v-col>
				</v-row>
				<v-row class="ma-0">
					<v-col cols="12">
						<text-editor v-model="form.description" placeholder="Description" />
						<div class="error-wrapper">
							<span class="error-text" v-if="errors.description" v-text="errors.description[0]"></span>
						</div>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12" xl="3">
				<v-row class="ma-0">
					<v-col cols="12">
						<v-card>
							<v-card-title class="py-2">Publish</v-card-title>
							<v-divider></v-divider>
							<v-card-text class="py-0">
								<v-radio-group v-model="form.status" :error-messages="errors.status">
									<v-radio label="Public" value="public"></v-radio>
									<v-radio label="Private" value="private"></v-radio>
								</v-radio-group>
							</v-card-text>
							<v-divider></v-divider>
							<v-card-actions class="px-4">
								<v-btn color="primary" :loading="loading" block depressed @click="publish">Publish</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { nanoid } from 'nanoid'
	export default {
		middleware: 'admin',
		layout: 'admin',
		head: {
			title: 'New product'
		},
		methods: {
			publish () {
				return this.$route.params.id ? this.edit() : this.create()
			},
			create () {
				this.loading = true
				this.$admin.$post('/products', this.form)
				.then(response => {
					this.$router.replace('/admin/products')
				}).catch(error => {
					this.loading = false
					this.errors = error.response.data.errors
				})
			},
			edit () {
				this.loading = true
				this.$admin.$put(`/products/${this.$route.params.id}`, this.form)
				.then(response => {
					this.$router.replace('/admin/products')
				}).catch(error => {
					this.loading = false
					this.errors = error.response.data.errors
				})
			},
			upload (event) {
				event.target.files.forEach(img => {
					var count = this.form.images.length
					if (count < 9) {
						var name = nanoid(10) + '.' + img.name.split('.').slice(-1)
						this.$set(this.form.images, count, {
							path: null,
							url: null
						})
						this.$fire.storage.ref(`/products/${this.folder}/${name}`).put(img)
						.then(response => {
							response.ref.getDownloadURL().then(url => {
								this.form.images[count].path = response.ref.fullPath
								this.form.images[count].url = url
							})
						})
					}
				})
				event.target.type = 'text'
				event.target.type = 'file'
			},
			deleteImg (i) {
				this.$fire.storage.ref(this.form.images[i].path).delete()
				.then(() => {
					this.form.images.splice(i, 1)
				})
			}
		},
		data () {
			return {
				folder: nanoid(20),
				loading: false,
				errors: {},
				form: {
					long: null,
					short: null,
					price: null,
					stock: null,
					images: [],
					description: null,
					status: 'public'
				}
			}
		},
		mounted () {
			if (this.$route.params.id) {
				this.$admin.$get(`/products/${this.$route.params.id}`)
				.then(response => {
					this.form.long = response.data.longTitle
					this.form.short = response.data.shortTitle
					this.form.price = response.data.price
					this.form.stock = response.data.stock
					this.form.images = response.data.images
					this.form.description = response.data.description
					this.form.status = response.data.status
					this.folder = this.form.images[0].path.split('/').at(-2)
				})
			}
		}
	}
</script>

<style scoped>
	.gallery label {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid var(--v-background-darken1);
		cursor: pointer;
	}
	.gallery .item {
		height: 0;
		position: relative;
		padding-bottom: calc(100% - 1px);
		border-left: 1px solid;
		border-bottom: 1px solid;
		border-color: var(--v-background-darken1);
	}
	.gallery .progress {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.gallery .delete {
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 1;
	}
</style>
