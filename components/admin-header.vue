<template>
	<header>
		<v-app-bar color="white" height="75" tag="div" flat>
			<v-container class="pa-0" fluid>
				<div class="d-flex align-center">
					<div>
						<v-toolbar-title>
							<app-logo />
						</v-toolbar-title>
					</div>
					<div class="ml-auto">
						<v-btn to="/admin/products/form" color="primary" icon nuxt><v-icon>mdi-plus</v-icon></v-btn>
						<v-btn to="/admin/messages" color="primary" icon nuxt><v-icon>mdi-forum</v-icon></v-btn>
						<v-btn to="/admin/notifications" color="primary" icon nuxt><v-icon>mdi-bell</v-icon></v-btn>
						<v-btn color="primary" :loading="loading" icon @click="logout"><v-icon>mdi-logout</v-icon></v-btn>
					</div>
				</div>
			</v-container>
		</v-app-bar>
	</header>
</template>

<script>
	import moment from 'moment'
	export default {
		methods: {
			logout () {
				this.loading = true
				this.$admin.$post('/admin/logout')
				.finally(() => {
					this.$cookies.remove('at')
					this.$router.go()
				})
			},
			time (date) {
				return moment(date).fromNow()
			}
		},
		data () {
			return {
				loading: false,
				messages: {}
			}
		}
	}
</script>
