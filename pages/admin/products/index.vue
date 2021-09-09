<template>
	<div class="pa-12">
		<v-row>
			<v-col cols="12">
				<v-dialog v-model="dialog" width="400">
					<v-card>
						<v-card-text class="pa-4 pb-0">
							<v-text-field
								label="Price"
								v-model="form.price"
								:error-messages="errors.price"
								suffix="MAD"
								outlined
							/>
							<v-text-field
								label="Stock"
								v-model="form.stock"
								:error-messages="errors.stock"
								outlined
							/>
						</v-card-text>
						<v-divider></v-divider>
						<v-card-actions class="justify-end">
							<v-btn color="secondary" depressed @click="dialog = false; errors = {}">Close</v-btn>
							<v-btn color="primary" :loading="loading" depressed @click="quick">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-card>
					<v-card-text class="pa-0">
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">#</th>
										<th class="text-left">Title</th>
										<th class="text-left">Price</th>
										<th class="text-left">Stock</th>
										<th class="text-left">Status</th>
										<th class="text-left">Operation</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(product, i) in products.data" :key="product.id">
										<td v-text="i + 1"></td>
										<td>
											<span class="text-capitalize" v-text="product.longTitle"></span>
										</td>
										<td>
											<span v-text="product.price"></span>
											<span>MAD</span>
										</td>
										<td>
											<span v-text="product.stock"></span>
										</td>
										<td>
											<span class="text-capitalize" v-text="product.status"></span>
										</td>
										<td>
											<v-btn :to="`/products/${product.id}`" target="_blank" color="info" x-small fab depressed>
												<v-icon>mdi-link</v-icon>
											</v-btn>
											<v-menu offset-y left>
												<template v-slot:activator="{ on, attrs }">
													<v-btn color="primary" x-small fab depressed v-bind="attrs" v-on="on">
														<v-icon>mdi-dots-vertical</v-icon>
													</v-btn>
												</template>
												<v-list dense>
													<v-list-item @click="open(i)">
														<v-list-item-title>Quick edit</v-list-item-title>
													</v-list-item>
													<v-list-item :to="`/admin/products/form/${product.id}`">
														<v-list-item-title>Full edit</v-list-item-title>
													</v-list-item>
													<v-list-item v-if="product.status === 'private'" @click="show(product.id)">
														<v-list-item-title>Show product</v-list-item-title>
													</v-list-item>
													<v-list-item v-else-if="product.status === 'public'" @click="hide(product.id)">
														<v-list-item-title>Hide product</v-list-item-title>
													</v-list-item>
													<v-list-item @click="del(product.id)">
														<v-list-item-title>Delete product</v-list-item-title>
													</v-list-item>
												</v-list>
											</v-menu>
										</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	export default {
		middleware: 'admin',
		layout: 'admin',
		head: {
			title: 'Products'
		},
		computed: {
			confirm () {
				return {
					icon: 'warning',
					title: 'Are you sure ?',
					confirmButtonText: 'Yes',
					showCancelButton: true,
					reverseButtons: true
				}
			}
		},
		methods: {
			open (i) {
				this.form.price = this.products.data[i].price
				this.form.stock = this.products.data[i].stock
				this.active = this.products.data[i].id
				this.dialog = true
			},
			quick () {
				this.loading = true
				this.$admin.$patch(`/products/quick/${this.active}`, this.form)
				.then(response => {
					this.loading = false
					this.dialog = false
					this.$nuxt.refresh()
				}).catch(error => {
					this.loading = false
					this.errors = error.response.data.errors
				})
			},
			show (id) {
				this.$swal(this.confirm).then(result => {
					if (result.isConfirmed) {
						this.$admin.$patch(`/products/show/${id}`)
						.then(response => {
							this.$nuxt.refresh()
						})
					}
				})
			},
			hide (id) {
				this.$swal(this.confirm).then(result => {
					if (result.isConfirmed) {
						this.$admin.$patch(`/products/hide/${id}`)
						.then(response => {
							this.$nuxt.refresh()
						})
					}
				})
			},
			del (id) {
				this.$swal(this.confirm).then(result => {
					if (result.isConfirmed) {
						this.$admin.$delete(`/products/${id}`)
						.then(response => {
							this.$nuxt.refresh()
						})
					}
				})
			}
		},
		async asyncData ({$admin}) {
			let products = await $admin.$get('/products')
			return {products}
		},
		data () {
			return {
				loading: false,
				dialog: false,
				active: null,
				products: {},
				errors: {},
				form: {
					price: null,
					stock: null
				}
			}
		}
	}
</script>
