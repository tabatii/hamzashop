<template>
	<div class="pa-12">
		<v-row>
			<v-col cols="12">
				<v-card class="mb-4">
					<v-card-text class="pa-0">
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Region</th>
										<th class="text-left">Price</th>
										<th class="text-left">Min time</th>
										<th class="text-left">Max time</th>
										<th class="text-left">Operation</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(rate, i) in rates.data" :key="rate.id">
										<td>
											<span class="text-capitalize" v-text="rate.region"></span>
										</td>
										<td>
											<span v-text="rate.price"></span>
											<span>DH</span>
										</td>
										<td>
											<span v-text="rate.min"></span>
											<span>Day(s)</span>
										</td>
										<td>
											<span v-text="rate.max"></span>
											<span>Day(s)</span>
										</td>
										<td>
											<v-btn color="error" x-small fab depressed @click="del(rate.id)">
												<v-icon>mdi-close</v-icon>
											</v-btn>
										</td>
									</tr>
									<tr>
										<td>
											<v-sheet outlined rounded>
												<v-select
													:items="countries"
													v-model="form.region"
													:error-messages="errors.region"
													dense solo flat hide-details
												/>
											</v-sheet>
										</td>
										<td>
											<v-sheet outlined rounded>
												<v-text-field
													suffix="DH"
													v-model="form.price"
													:error-messages="errors.price"
													dense solo flat hide-details
												/>
											</v-sheet>
										</td>
										<td>
											<v-sheet outlined rounded>
												<v-text-field
													suffix="Days"
													v-model="form.min"
													:error-messages="errors.min"
													dense solo flat hide-details
												/>
											</v-sheet>
										</td>
										<td>
											<v-sheet outlined rounded>
												<v-text-field
													suffix="Days"
													v-model="form.max"
													:error-messages="errors.max"
													dense solo flat hide-details
												/>
											</v-sheet>
										</td>
										<td>
											<v-btn color="primary" :loading="loading" x-small fab depressed @click="save">
												<v-icon>mdi-check</v-icon>
											</v-btn>
										</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-card-text>
				</v-card>
				<v-alert type="error" text v-if="Object.keys(errors).length">
					<p class="mb-0" v-for="(error, i) in errors" :key="i" v-text="error[0]"></p>
				</v-alert>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { getNames } from 'country-list'
	export default {
		middleware: 'admin',
		layout: 'admin',
		head: {
			title: 'Shipping rates'
		},
		computed: {
			countries () {
				return getNames().sort()
			},
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
			save () {
				this.loading = true
				this.$admin.$post('/shipping', this.form)
				.then(response => {
					this.reset()
					this.loading = false
					this.$nuxt.refresh()
				}).catch(error => {
					this.loading = false
					this.errors = error.response.data.errors
				})
			},
			del (id) {
				this.$swal(this.confirm).then(result => {
					if (result.isConfirmed) {
						this.$admin.$delete(`/shipping/${id}`)
						.then(response => {
							this.$nuxt.refresh()
						})
					}
				})
			},
			reset () {
				this.form.region = null
				this.form.price = null
				this.form.min = null
				this.form.max = null
			}
		},
		async asyncData ({$admin}) {
			let rates = await $admin.$get('/shipping')
			return {rates}
		},
		data () {
			return {
				loading: false,
				errors: {},
				rates: {},
				form: {
					region: null,
					price: null,
					min: null,
					max: null
				}
			}
		}
	}
</script>
