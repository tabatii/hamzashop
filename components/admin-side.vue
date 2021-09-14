<template>
	<div>
		<div class="d-flex align-center px-4" style="height:74px">
			<nuxt-link to="/" class="logo">AdminCP</nuxt-link>
		</div>
		<v-divider dark></v-divider>
		<v-list color="primary darken-4" dark shaped>
			<v-list-item-group>
				<v-list-item to="/admin" nuxt exact>
					<v-list-item-icon>
						<v-icon>mdi-view-dashboard</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Dashboard</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item to="/admin/products" nuxt exact>
					<v-list-item-icon>
						<v-icon>mdi-database</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Products</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item to="/admin/orders" nuxt exact>
					<v-list-item-icon>
						<v-icon>mdi-cart</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Orders</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item to="/admin/users" nuxt exact>
					<v-list-item-icon>
						<v-icon>mdi-account-circle</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Users</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item to="/admin/shipping" nuxt exact>
					<v-list-item-icon>
						<v-icon>mdi-truck</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Shipping</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</div>
</template>

<style scoped>
	.logo {
		display: flex;
		color: white;
		font-size: 40px;
		font-weight: 100;
		line-height: 1;
		letter-spacing: 5px;
		text-transform: capitalize;
		text-decoration: none;
	}
</style>
