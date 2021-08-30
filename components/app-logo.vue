<template>
	<nuxt-link to="/" class="logo">
		<span class="part-1" v-text="partOne"></span>
		<span class="part-2" v-text="partTwo"></span>
	</nuxt-link>
</template>

<script>
	export default {
		computed: {
			partOne () {
				return this.$config.name.substring(0, 4)
			},
			partTwo () {
				return this.$config.name.substring(4)
			}
		}
	}
</script>

<style scoped>
	.logo {
		display: flex;
		color: var(--v-primary-base);
		font-size: 36px;
		font-weight: 100;
		line-height: 1;
		letter-spacing: 5px;
		text-transform: capitalize;
		text-decoration: none;
	}
	.part-1 {
		text-shadow: 1px -1px 0 var(--v-primary-lighten4),
					 2px -2px 0 var(--v-primary-lighten4),
					 3px -3px 0 var(--v-primary-lighten4),
					 4px -4px 0 var(--v-primary-lighten4),
					 5px -5px 0 var(--v-primary-lighten4);
	}
	.part-2 {
		margin-left: .5rem;
		text-shadow: -1px -1px 0 var(--v-primary-lighten4),
					 -2px -2px 0 var(--v-primary-lighten4),
					 -3px -3px 0 var(--v-primary-lighten4),
					 -4px -4px 0 var(--v-primary-lighten4),
					 -5px -5px 0 var(--v-primary-lighten4);
	}
</style>
