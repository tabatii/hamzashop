<template>
	<div class="pa-12">
		<v-row>
			<v-col cols="12" md="6" xl="3">
				<v-card>
					<v-card-text>
						<div class="d-flex">
							<v-btn color="primary" fab depressed>
								<v-icon>mdi-currency-usd</v-icon>
							</v-btn>
							<div class="ml-3">
								<p class="mb-0">Total Sales</p>
								<p class="text-h6 text--primary mb-0">
									<span v-text="count.sales"></span>
									<span>MAD</span>
								</p>
							</div>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6" xl="3">
				<v-card>
					<v-card-text>
						<div class="d-flex">
							<v-btn color="info" fab depressed>
								<v-icon>mdi-cart</v-icon>
							</v-btn>
							<div class="ml-3">
								<p class="mb-0">Finished Orders</p>
								<p class="text-h6 text--primary mb-0" v-text="count.orders"></p>
							</div>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6" xl="3">
				<v-card>
					<v-card-text>
						<div class="d-flex">
							<v-btn color="orange" fab depressed dark>
								<v-icon>mdi-database</v-icon>
							</v-btn>
							<div class="ml-3">
								<p class="mb-0">Total Products</p>
								<p class="text-h6 text--primary mb-0" v-text="count.products"></p>
							</div>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6" xl="3">
				<v-card>
					<v-card-text>
						<div class="d-flex">
							<v-btn color="error" fab depressed>
								<v-icon>mdi-account-circle</v-icon>
							</v-btn>
							<div class="ml-3">
								<p class="mb-0">Registered Users</p>
								<p class="text-h6 text--primary mb-0" v-text="count.users"></p>
							</div>
						</div>
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
			title: 'Dashboard'
		},
		async asyncData ({$admin}) {
			let count = await $admin.$get('/dashboard')
			return {count}
		},
		data () {
			return {
				count: null,
			}
		}
	}
</script>
