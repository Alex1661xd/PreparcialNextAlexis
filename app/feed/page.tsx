"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/auth";
import { fetchPosts, updatePost } from "@/lib/api";
import type { Post } from "@/lib/api";
import CreatePost from "@/components/CreatePost";
import PostList from "@/components/PostList";

export default function FeedPage() {
	const router = useRouter();
	const [posts, setPosts] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const token = getAuthToken();
		if (!token) {
			router.replace("/login");
			return;
		}

		loadPosts();
	}, [router]);

	async function loadPosts() {
		try {
			setIsLoading(true);
			setError(null);
			const data = await fetchPosts();
			setPosts(data);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Error al cargar los posts";
			setError(msg);
		} finally {
			setIsLoading(false);
		}
	}

	function handlePostCreated(newPost: Post) {
		const ensured: Post = {
			...newPost,
			created_at: newPost.created_at || new Date().toISOString(),
			comments: Array.isArray(newPost.comments) ? newPost.comments : [],
		};
		setPosts([ensured, ...posts]);
	}

	async function handleAddComment(postId: number, content: string) {
		const existing = posts.find((p) => p.id === postId);
		if (!existing) return;
		const newComment = {
			id: Date.now(),
			content,
			user_id: 0,
			created_at: new Date().toISOString(),
		};
		const updatedPost: Post = {
			...existing,
			comments: [...(existing.comments || []), newComment],
		};
		const saved = await updatePost(updatedPost);
		setPosts((prev) => prev.map((p) => (p.id === postId ? { ...saved, comments: saved.comments || [] } : p)));
	}

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
				<p className="text-zinc-600 dark:text-zinc-400">Cargando posts...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-black">
			<main className="mx-auto w-full max-w-3xl p-6 py-8">
				<div className="mb-6 flex items-center justify-between">
					<h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Feed</h1>
				</div>

				<CreatePost onPostCreated={handlePostCreated} />

				{error ? (
					<div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
						{error}
						<button
							onClick={loadPosts}
							className="ml-4 text-sm font-medium underline"
						>
							Reintentar
						</button>
					</div>
				) : null}

				<PostList posts={posts} onAddComment={handleAddComment} />
			</main>
		</div>
	);
}

