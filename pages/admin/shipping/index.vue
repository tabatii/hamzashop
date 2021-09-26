<template>
	<div class="pa-12">
		<v-row>
			<v-col cols="12" xl="8">
				<v-card>
					<v-card-text class="pa-0">
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">#</th>
										<th class="text-left">Country</th>
										<th class="text-left">Price</th>
										<th class="text-left">Min time</th>
										<th class="text-left">Max time</th>
										<th class="text-left">Operation</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(rate, i) in rates.data" :key="rate.id">
										<td v-text="i + 1"></td>
										<td>
											<span class="text-capitalize" v-text="rate.country"></span>
										</td>
										<td>
											<span v-text="rate.price"></span>
											<span>MAD</span>
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
								</tbody>
							</template>
						</v-simple-table>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" xl="4">
				<v-card>
					<v-card-text class="pa-6">
						<v-select
							label="Country"
							:items="countries"
							v-model="form.country"
							:error-messages="errors.country"
							outlined
						/>
						<v-text-field
							label="Price"
							v-model="form.price"
							:error-messages="errors.price"
							suffix="MAD"
							outlined
						/>
						<v-text-field
							label="Minimum time"
							v-model="form.min"
							:error-messages="errors.min"
							suffix="Days"
							outlined
						/>
						<v-text-field
							label="Maximum time"
							v-model="form.max"
							:error-messages="errors.max"
							suffix="Days"
							outlined
						/>
						<v-btn color="primary" :loading="loading" block depressed x-large @click="save">Save</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { getNames, getCode } from 'country-list'
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
				this.form.code = this.form.country ? getCode(this.form.country) : null
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
				this.form.country = null
				this.form.code = null
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
					country: null,
					code: null,
					price: null,
					min: null,
					max: null
				}
			}
		}
	}
</script>
