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
										<th class="text-left">#</th>
										<th class="text-left">Name</th>
										<th class="text-left">Email</th>
										<th class="text-left">Verified</th>
										<th class="text-left">Date</th>
										<th class="text-left">Operation</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(user, i) in users.data" :key="user.id">
										<td v-text="i + 1"></td>
										<td>
											<span class="text-capitalize" v-text="user.name"></span>
										</td>
										<td>
											<span v-text="user.email"></span>
										</td>
										<td>
											<span v-if="user.verified">Yes</span>
											<span v-else>No</span>
										</td>
										<td>
											<span class="text-capitalize" v-text="user.created_at"></span>
										</td>
										<td>
											<v-btn color="error" x-small fab depressed @click="del(user.id)">
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
	export default {
		middleware: 'admin',
		layout: 'admin',
		head: {
			title: 'Users'
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
						this.$admin.$delete(`/users/${id}`)
						.then(response => {
							this.$nuxt.refresh()
						})
					}
				})
			}
		},
		async asyncData ({$admin}) {
			let users = await $admin.$get('/users')
			return {users}
		},
		data () {
			return {
				users: {}
			}
		}
	}
</script>
