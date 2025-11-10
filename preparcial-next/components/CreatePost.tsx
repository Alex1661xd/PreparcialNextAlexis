"use client";

import { useState } from "react";
import { createPost } from "@/lib/api";
import type { Post } from "@/lib/api";

interface CreatePostProps {
	onPostCreated: (post: Post) => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
	const [content, setContent] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);

		if (!content.trim()) {
			setError("El contenido del post no puede estar vacío");
			return;
		}

		setIsSubmitting(true);
		try {
			const newPost = await createPost(content.trim());
			setContent("");
			onPostCreated(newPost);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Error al crear el post";
			setError(msg);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="mb-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
			<h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Crear nuevo post</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<label className="flex flex-col gap-2">
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="¿En qué estás pensando?"
						rows={4}
						className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-100"
						required
					/>
				</label>
				{error && (
					<div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
						{error}
					</div>
				)}
				<button
					type="submit"
					disabled={isSubmitting || !content.trim()}
					className="self-end rounded-lg bg-zinc-950 px-6 py-2 font-medium text-white transition-colors hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
				>
					{isSubmitting ? "Publicando..." : "Publicar"}
				</button>
			</form>
		</div>
	);
}

