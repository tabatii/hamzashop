<template>
	<header>
		<v-app-bar color="white" height="75" tag="div" flat>
			<v-container class="pa-0" fluid>
				<div class="d-flex align-center">
					<div class="ml-auto">
						<v-btn to="/admin/products/form" class="ml-2" fab small depressed nuxt>
							<v-icon>mdi-plus</v-icon>
						</v-btn>
						<v-badge color="error" :content="messages" :value="messages" bordered overlap>
							<v-btn to="/admin/messages" class="ml-2" fab small depressed nuxt>
								<v-icon>mdi-chat</v-icon>
							</v-btn>
						</v-badge>
						<v-badge color="error" :content="notifications" :value="notifications" bordered overlap>
							<v-btn to="/admin/notifications" class="ml-2" fab small depressed nuxt>
								<v-icon>mdi-bell</v-icon>
							</v-btn>
						</v-badge>
						<v-btn class="ml-2" :loading="loading" fab small depressed @click="logout">
							<v-icon>mdi-logout</v-icon>
						</v-btn>
					</div>
				</div>
			</v-container>
		</v-app-bar>
	</header>
</template>

<script>
	import { mapState } from 'vuex'
	import moment from 'moment'
	export default {
		computed: {
			...mapState(['header']),
			notifications () {
				return this.header.notifications
			},
			messages () {
				return this.header.messages
			}
		},
		methods: {
			logout () {
				this.loading = true
				this.$admin.$post('/admin/logout')
				.finally(() => {
					this.$cookies.remove('at')
					this.$router.go()
				})
			}
		},
		data () {
			return {
				loading: false
			}
		}
	}
</script>
