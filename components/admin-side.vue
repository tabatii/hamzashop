<template>
	<div>
		<v-list shaped>
			<v-list-item-group color="primary">
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
				<v-list-item to="/admin/settings" nuxt exact>
					<v-list-item-icon>
						<v-icon>mdi-cog</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Settings</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</div>
</template>
