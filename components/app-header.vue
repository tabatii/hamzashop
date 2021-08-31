<template>
	<header>
		<v-app-bar color="white" height="42" tag="div" flat>
			<v-container>
				<div class="d-flex justify-end">
					<v-menu offset-y>
						<template v-slot:activator="{ on, attrs }">
							<v-btn text small v-bind="attrs" v-on="on">
								<span class="pl-1">Currency</span>
								<v-icon size="20">mdi-chevron-down</v-icon>
							</v-btn>
						</template>
						<v-list dense>
							<v-list-item link @click="currency('MAD')">
								<v-list-item-avatar class="mr-2" size="20">
									<v-img src="/template/ma.png" />
								</v-list-item-avatar>
								<v-list-item-title>MAD</v-list-item-title>
							</v-list-item>
							<v-list-item link @click="currency('EUR')">
								<v-list-item-avatar class="mr-2" size="20">
									<v-img src="/template/eu.png" />
								</v-list-item-avatar>
								<v-list-item-title>EUR</v-list-item-title>
							</v-list-item>
							<v-list-item link @click="currency('USD')">
								<v-list-item-avatar class="mr-2" size="20">
									<v-img src="/template/usa.png" />
								</v-list-item-avatar>
								<v-list-item-title>USD</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</div>
			</v-container>
		</v-app-bar>
		<v-divider style="border-color:var(--v-background-base)"></v-divider>
		<v-app-bar color="white" height="75" tag="div" flat>
			<v-container>
				<v-row no-gutters>
					<v-col md="3">
						<v-toolbar-title>
							<app-logo />
						</v-toolbar-title>
					</v-col>
					<v-col md="6">
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
			currency (code) {
				fetch(`https://api.exchangerate.host/convert?from=MAD&to=${code}`)
				.then(response => {
					return response.json()
				}).then(response => {
					this.$cookies.set('cr', response.info.rate)
					this.$cookies.set('cc', code)
					this.$nuxt.refresh()
				})
			},
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
