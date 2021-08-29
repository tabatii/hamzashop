<template>
	<header>
		<v-app-bar color="white" height="75" tag="div" flat>
			<v-container>
				<v-row no-gutters>
					<v-col md="4">
						<v-toolbar-title>
							<app-logo></app-logo>
						</v-toolbar-title>
					</v-col>
					<v-col md="5">
						<div>
							<v-btn to="/" color="primary" text nuxt>Home</v-btn>
							<v-btn to="/contact" color="primary" text nuxt>Contact</v-btn>
							<v-btn :href="$config.blog" color="primary" target="_blank" text>Blog</v-btn>
						</div>
					</v-col>
					<v-col md="3" class="d-flex justify-end">
						<div v-if="auth.loggedIn">
							<v-btn to="/account/orders" color="primary" text nuxt>Orders</v-btn>
							<v-btn color="primary" :loading="loading" text @click="logout">Logout</v-btn>
						</div>
						<div v-else>
							<v-btn to="/auth/login" color="primary" text nuxt>Login</v-btn>
							<v-btn to="/auth/register" color="primary" depressed nuxt>Sign up</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</v-app-bar>
	</header>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		computed: {
			...mapState(['auth'])
		},
		methods: {
			logout () {
				this.loading = true
				this.$axios.$post('/auth/logout')
				.finally(() => {
					this.$cookies.remove('ut')
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
