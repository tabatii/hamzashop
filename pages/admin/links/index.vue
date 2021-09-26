<template>
	<div class="pa-12">
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-card-text class="pa-0">
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Title</th>
										<th class="text-left">Slug</th>
										<th class="text-left">Operation</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="product in products.data" :key="product.id">
										<td>
											<span class="text-capitalize" v-text="product.title"></span>
										</td>
										<td>
											<span v-text="product.slug"></span>
										</td>
										<td>
											<v-btn :to="`/products/${product.id}`" target="_blank" color="info" x-small fab depressed>
												<v-icon>mdi-link</v-icon>
											</v-btn>
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
			title: 'Links'
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
			let links = await $admin.$get('/links')
			return {links}
		},
		data () {
			return {
				links: {},
				errors: {},
				form: {
					price: null,
					stock: null
				}
			}
		}
	}
</script>
