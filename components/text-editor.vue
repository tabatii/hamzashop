<template>
	<div class="text-editor">
		<tiptap-vuetify :value="value" :placeholder="placeholder" :extensions="extensions" @input="$emit('input', arguments[0])" />
	</div>
</template>

<script>
	import {
		TiptapVuetify,
		Heading,
		Bold,
		Italic,
		Strike,
		Underline,
		CodeBlock,
		Paragraph,
		BulletList,
		OrderedList,
		ListItem,
		Link,
		Blockquote,
		HardBreak,
		HorizontalRule,
		History,
		Image,
	} from 'tiptap-vuetify'
	export default {
		components: {
			TiptapVuetify
		},
		props: {
			placeholder: String,
			value: String
		},
		data () {
			return {
				extensions: [
					History,
					[
						Heading, {
							options: {
								levels: [1, 2, 3]
							}
						}
					],
					Bold,
					Italic,
					Underline,
					Strike,
					CodeBlock,
					Blockquote,
					Link,
					ListItem,
					BulletList,
					OrderedList,
					Image,
					HorizontalRule,
					Paragraph,
					HardBreak,
				]
			}
		}
	}
</script>
