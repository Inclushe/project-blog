import React from "react";

import BlogHero from "@/components/BlogHero";

import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";
import CodeSnippet from "@/components/CodeSnippet";
import dynamic from "next/dynamic";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
import CircularColorsDemo from "@/components/CircularColorsDemo";

import styles from "./postSlug.module.css";

export async function generateMetadata({ params }) {
	const blogPost = await loadBlogPost(params.postSlug);
	return {
		title: `${blogPost.frontmatter.title} • ${BLOG_TITLE}`,
		description: `${blogPost.frontmatter.abstract}`,
	};
}

async function BlogPost({ params }) {
	const blogPost = await loadBlogPost(params.postSlug);
	return (
		<article className={styles.wrapper}>
			<BlogHero
				title={blogPost.frontmatter.title}
				publishedOn={blogPost.frontmatter.publishedOn}
			/>
			<div className={styles.page}>
				<MDXRemote
					source={blogPost.content}
					components={{
						pre: CodeSnippet,
						DivisionGroupsDemo,
						CircularColorsDemo,
					}}
				/>
			</div>
		</article>
	);
}

export default BlogPost;
