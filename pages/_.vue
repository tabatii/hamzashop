<template>
	<div>
		<section class="bg"></section>
		<section class="text-center mb-16">
			<h1>4O4</h1>
			<p v-text="$lang('error.text')"></p>
		</section>
	</div>
</template>

<style scoped>
	h1 {
		color: var(--v-primary-lighten2);
		font-size: 15rem;
		font-weight: 100;
		line-height: 1;
	}
	p {
		color: var(--v-primary-lighten2);
		font-size: 3rem;
		font-weight: 300;
		margin-bottom: 0;
	}
</style>
