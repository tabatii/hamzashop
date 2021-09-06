<template>
	<div>
		<section class="bg"></section>
		<section class="mb-16">
			<v-container>
				<h3 class="text-h4 text-center mb-1">Shipping Rates</h3>
				<div class="line mx-auto mb-12" style="width:50px"></div>
				<v-row justify="center">
					<v-col cols="6">
						<v-card class="mb-4">
							<v-card-text class="pa-0">
								<v-simple-table>
									<template v-slot:default>
										<thead>
											<tr>
												<th class="text-left">Region</th>
												<th class="text-left">Price</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="rate in rates.data" :key="rate.id">
												<td>
													<span class="text-capitalize" v-text="rate.region"></span>
												</td>
												<td>
													<span v-text="$currency(rate.price)"></span>
													<span v-text="$cookies.get('cc')"></span>
												</td>
											</tr>
										</tbody>
									</template>
								</v-simple-table>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</section>
	</div>
</template>

<script>
	export default {
		head: {
			title: 'Shipping rates'
		},
		async asyncData ({$axios}) {
			let rates = await $axios.$get('/shipping')
			return {rates}
		},
		data () {
			return {
				rates: {}
			}
		}
	}
</script>
