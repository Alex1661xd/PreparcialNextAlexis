"use client";

import { useState } from "react";
import type { Post } from "@/lib/api";

interface PostListProps {
	posts: Post[];
	onAddComment: (postId: number, content: string) => Promise<void> | void;
}

function formatDate(dateString: string | undefined | null): string {
	if (!dateString) return "";
	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) return "";
	return new Intl.DateTimeFormat("es-ES", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(date);
}

export default function PostList({ posts, onAddComment }: PostListProps) {
	const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({});
	const [submitting, setSubmitting] = useState<Record<number, boolean>>({});
	const [errors, setErrors] = useState<Record<number, string | null>>({});

	function setDraft(postId: number, value: string) {
		setCommentDrafts((prev) => ({ ...prev, [postId]: value }));
	}

	async function handleSubmit(postId: number) {
		const content = (commentDrafts[postId] || "").trim();
		if (!content) {
			setErrors((prev) => ({ ...prev, [postId]: "El comentario no puede estar vacío" }));
			return;
		}
		setErrors((prev) => ({ ...prev, [postId]: null }));
		setSubmitting((prev) => ({ ...prev, [postId]: true }));
		try {
			await onAddComment(postId, content);
			setDraft(postId, "");
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Error al agregar comentario";
			setErrors((prev) => ({ ...prev, [postId]: msg }));
		} finally {
			setSubmitting((prev) => ({ ...prev, [postId]: false }));
		}
	}
	if (posts.length === 0) {
		return (
			<div className="rounded-xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
				<p className="text-zinc-600 dark:text-zinc-400">No hay posts disponibles. ¡Sé el primero en publicar!</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{posts.map((post) => (
				<article
					key={post.id}
					className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
				>
					<div className="mb-3 flex-1">
						<p className="mb-2 whitespace-pre-wrap text-zinc-900 dark:text-zinc-50">{post.content}</p>
					</div>
					<p className="text-sm text-zinc-500 dark:text-zinc-400">Publicado el {formatDate(post.created_at)}</p>

					{post.comments && post.comments.length > 0 && (
						<div className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
							<h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
								Comentarios ({post.comments.length})
							</h3>
							<div className="space-y-3">
								{post.comments.map((comment) => (
									<div
										key={comment.id}
										className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50"
									>
										<p className="mb-1 text-sm text-zinc-900 dark:text-zinc-100">{comment.content}</p>
										<p className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(comment.created_at)}</p>
									</div>
								))}
							</div>
						</div>
					)}

					<div className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
						<h4 className="mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">Agregar comentario</h4>
						{errors[post.id] ? (
							<div className="mb-2 rounded-md border border-red-300 bg-red-50 px-2 py-1 text-xs text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
								{errors[post.id]}
							</div>
						) : null}
						<div className="flex gap-2">
							<input
								type="text"
								value={commentDrafts[post.id] || ""}
								onChange={(e) => setDraft(post.id, e.target.value)}
								placeholder="Escribe un comentario..."
								className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
							/>
							<button
								onClick={() => handleSubmit(post.id)}
								disabled={submitting[post.id]}
								className="rounded-lg bg-zinc-950 px-3 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900"
							>
								{submitting[post.id] ? "Enviando..." : "Comentar"}
							</button>
						</div>
					</div>
				</article>
			))}
		</div>
	);
}

