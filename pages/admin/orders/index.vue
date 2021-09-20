<template>
	<div class="pa-12">
		<v-row>
			<v-col cols="12">
				<v-dialog v-model="dialog.address" width="400">
					<v-card>
						<v-card-text class="text--primary px-4 py-3">
							<div v-if="active.address">
								<v-row no-gutters>
									<v-col cols="5" class="text--secondary">Name :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.address.name"></v-col>
								</v-row>
								<v-row no-gutters>
									<v-col cols="5" class="text--secondary">Mobile :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.address.mobile"></v-col>
								</v-row>
								<v-row no-gutters>
									<v-col cols="5" class="text--secondary">Address :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.address.street"></v-col>
								</v-row>
								<v-row no-gutters v-if="active.address.details">
									<v-col cols="5" class="text--secondary">Details :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.address.details"></v-col>
								</v-row>
								<v-row no-gutters>
									<v-col cols="5" class="text--secondary">City / Town :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.address.city"></v-col>
								</v-row>
								<v-row no-gutters>
									<v-col cols="5" class="text--secondary">Zip code :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.address.zip"></v-col>
								</v-row>
								<v-row no-gutters>
									<v-col cols="5" class="text--secondary">Country :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.address.country"></v-col>
								</v-row>
							</div>
						</v-card-text>
						<v-divider></v-divider>
						<v-card-actions class="justify-end">
							<v-btn color="secondary" depressed @click="dialog.address = false">Close</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-dialog v-model="dialog.status" width="300">
					<v-card>
						<v-card-text class="text--primary px-4 py-2">
							<v-radio-group v-model="form.status">
								<v-radio label="Pending" value="pending"></v-radio>
								<v-radio label="Packing" value="packing"></v-radio>
								<v-radio label="Shipped" value="shipped"></v-radio>
								<v-radio label="Arrived" value="arrived"></v-radio>
							</v-radio-group>
						</v-card-text>
						<v-divider></v-divider>
						<v-card-actions class="justify-end">
							<v-btn color="secondary" depressed @click="dialog.status = false">Close</v-btn>
							<v-btn color="primary" depressed :loading="loading" @click="status(active.id)">Save</v-btn>
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
										<th class="text-left">Order Nº</th>
										<th class="text-left">Product</th>
										<th class="text-left">Quantity</th>
										<th class="text-left">Unit price</th>
										<th class="text-left">Shipping price</th>
										<th class="text-left">Total</th>
										<th class="text-left">Paid</th>
										<th class="text-left">Method</th>
										<th class="text-left">Date</th>
										<th class="text-left">Status</th>
										<th class="text-left">Operation</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(order, i) in orders.data" :key="order.id">
										<td v-text="i + 1"></td>
										<td>
											<span v-text="order.id"></span>
										</td>
										<td>
											<span class="text-capitalize" v-text="order.product.shortTitle"></span>
											<v-btn :to="`/products/${order.product.id}`" target="_blank" color="primary" small icon>
												<v-icon>mdi-link</v-icon>
											</v-btn>
										</td>
										<td>
											<span v-text="order.quantity"></span>
										</td>
										<td>
											<span v-text="order.unit_price"></span>
											<span>MAD</span>
										</td>
										<td>
											<span v-text="order.shipping_price"></span>
											<span>MAD</span>
										</td>
										<td>
											<span v-text="order.total_amount"></span>
											<span>MAD</span>
										</td>
										<td>
											<span v-text="order.paid_amount"></span>
											<span v-text="order.paid_currency"></span>
										</td>
										<td>
											<span class="text-capitalize" v-text="order.payment_method"></span>
										</td>
										<td>
											<span v-text="order.created_at"></span>
										</td>
										<td>
											<span class="text-capitalize" v-text="order.status"></span>
										</td>
										<td>
											<v-btn color="info" x-small fab depressed @click="openAddress(i)">
												<v-icon>mdi-map-marker</v-icon>
											</v-btn>
											<v-btn color="primary" x-small fab depressed v-if="condition(i)" @click="openStatus(i)">
												<v-icon>mdi-square-edit-outline</v-icon>
											</v-btn>
											<v-btn color="error" x-small fab depressed v-if="condition(i)" @click="refuse(order.id)">
												<v-icon>mdi-close</v-icon>
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
	import { getName } from 'country-list'
	export default {
		middleware: 'admin',
		layout: 'admin',
		head: {
			title: 'Orders'
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
			condition (i) {
				let array = ['received', 'cancelled']
				if (array.includes(this.orders.data[i].status)) {
					return false
				}
				return true
			},
			openAddress (i) {
				this.active = this.orders.data[i]
				this.active.address.country = getName(this.active.address.country)
				this.dialog.address = true
			},
			openStatus (i) {
				this.active = this.orders.data[i]
				this.form.status = this.active.status
				this.dialog.status = true
			},
			status (id) {
				this.loading = true
				this.$admin.$patch(`/orders/${id}`, this.form)
				.finally(response => {
					this.dialog.status = false
					this.loading = false
					this.$nuxt.refresh()
				})
			},
			refuse (id) {
				this.$swal(this.confirm).then(result => {
					if (result.isConfirmed) {
						this.$admin.$patch(`/orders/refuse/${id}`)
						.finally(response => {
							this.$nuxt.refresh()
						})
					}
				})
			}
		},
		async asyncData ({$admin}) {
			let orders = await $admin.$get('/orders')
			return {orders}
		},
		data () {
			return {
				loading: false,
				active: {},
				orders: {},
				dialog: {
					address: false,
					status: false
				},
				form: {
					status: null
				}
			}
		}
	}
</script>
