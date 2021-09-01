<template>
	<div>
		<section class="bg"></section>
		<section class="mb-16">
			<v-dialog v-model="dialog" max-width="700">
				<v-card>
					<v-card-title class="body-1 pa-4">
						<span class="text--secondary">{{ $lang('orders.id') }} :</span>
						<span class="ml-2" v-text="active.id"></span>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text class="text--primary px-4 py-3">
						<v-row v-if="active.address">
							<v-col cols="6">
								<v-row no-gutters>
									<v-col cols="5" class="text--secondary">{{ $lang('orders.dialog.address.name') }} :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.address.name"></v-col>
								</v-row>
								<v-row no-gutters>
									<v-col cols="5" class="text--secondary">{{ $lang('orders.dialog.address.mobile') }} :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.address.mobile"></v-col>
								</v-row>
								<v-row no-gutters>
									<v-col cols="5" class="text--secondary">{{ $lang('orders.dialog.address.street') }} :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.address.street"></v-col>
								</v-row>
								<v-row no-gutters>
									<v-col cols="5" class="text--secondary">{{ $lang('orders.dialog.address.city') }} :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.address.city"></v-col>
								</v-row>
								<v-row no-gutters>
									<v-col cols="5" class="text--secondary">{{ $lang('orders.dialog.address.zip') }} :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.address.zip"></v-col>
								</v-row>
								<v-row no-gutters>
									<v-col cols="5" class="text--secondary">{{ $lang('orders.dialog.address.country') }} :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.address.country"></v-col>
								</v-row>
							</v-col>
							<v-divider vertical></v-divider>
							<v-col cols="6">
								<v-row no-gutters>
									<v-col cols="5" class="text--secondary">{{ $lang('orders.dialog.info.date') }} :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.created_at"></v-col>
								</v-row>
								<v-row no-gutters>
									<v-col cols="5" class="text--secondary">{{ $lang('orders.dialog.info.payment') }} :</v-col>
									<v-col cols="7" class="text-capitalize" v-text="active.payment_method"></v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions class="justify-end">
						<v-btn color="secondary" depressed @click="dialog = false">
							{{ $lang('orders.dialog.btn') }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-container>
				<v-row>
					<v-col cols="12" class="mb-6">
						<v-row class="bg">
							<v-col cols="6" v-text="$lang('orders.table.product')"></v-col>
							<v-col cols="2" v-text="$lang('orders.table.total')"></v-col>
							<v-col cols="2" v-text="$lang('orders.table.status')"></v-col>
							<v-col cols="2" v-text="$lang('orders.table.operation')"></v-col>
						</v-row>
					</v-col>
					<v-col cols="12" class="mb-6" v-for="(order, i) in orders" :key="order.id">
						<v-row class="bg">
							<v-col cols="12" class="border-bottom">
								<div class="d-flex">
									<div class="body-2">
										<span class="text--secondary">{{ $lang('orders.id') }} :</span>
										<span v-text="order.id"></span>
									</div>
									<span class="body-2 text--secondary ml-auto" v-text="order.created_at"></span>
								</div>
							</v-col>
						</v-row>
						<v-row class="bg">
							<v-col cols="6">
								<div class="d-flex">
									<v-sheet height="72px" width="72px" outlined>
										<v-img :src="order.product.images[0]" lazy-src="/template/placeholder.png" />
									</v-sheet>
									<div class="ml-4">
										<p class="text-capitalize mb-0" v-text="order.product.title"></p>
										<div class="body-2">
											<span v-text="$currency(order.unit_price)"></span>
											<span v-text="$cookies.get('cc')"></span>
											<span class="text--secondary">x{{ order.quantity }}</span>
										</div>
									</div>
								</div>
							</v-col>
							<v-col cols="2">
								<div class="error--text">
									<span v-text="$currency(order.total_amount)"></span>
									<span v-text="$cookies.get('cc')"></span>
								</div>
							</v-col>
							<v-col cols="2">
								<span class="text-capitalize" v-text="order.status"></span>
							</v-col>
							<v-col cols="2">
								<div class="mb-3">
									<v-btn color="primary" small block depressed @click="details(i)">
										{{ $lang('orders.table.details') }}
									</v-btn>
								</div>
								<div v-if="order.status === 'pending'">
									<v-btn color="secondary" small block depressed @click="cancel(order.id)">
										{{ $lang('orders.table.cancel') }}
									</v-btn>
								</div>
							</v-col>
						</v-row>
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
			title: 'My orders'
		},
		computed: {
			confirm () {
				return {
					icon: 'warning',
					title: this.$lang('orders.confirm.text'),
					confirmButtonText: this.$lang('orders.confirm.yes'),
					cancelButtonText: this.$lang('orders.confirm.no'),
					showCancelButton: true,
					reverseButtons: true
				}
			}
		},
		methods: {
			details (index) {
				this.active = this.orders[index]
				this.dialog = true
			},
			cancel (id) {
				this.$swal(this.confirm).then(result => {
					if (result.isConfirmed) {
						this.$axios.$delete(`/orders/${id}`)
						.then(response => {
							this.$nuxt.refresh()
						}).catch(error => {
							this.$swal({
								text: error.response.data.message,
								icon: 'error'
							})
						})
					}
				})
			}
		},
		async asyncData ({$axios}) {
			let orders = await $axios.$get('/orders')
			return {orders}
		},
		data () {
			return {
				dialog: false,
				active: {},
				orders: []
			}
		}
	}
</script>

<style scoped>
	.border-bottom {
		border-bottom: 1px solid rgba(0, 0, 0, .12);
	}
</style>
