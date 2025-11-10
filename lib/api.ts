type LoginResponse = {
	access_token?: string;
	token?: string;
	[key: string]: unknown;
};

export type Comment = {
	id: number;
	content: string;
	user_id: number;
	created_at: string;
};

export type Post = {
	id: number;
	content: string;
	created_at: string;
	user_id: number;
	comments: Comment[];
};

export async function loginRequest(username: string, password: string): Promise<string> {
	const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
	if (!loginUrl) {
		throw new Error("NEXT_PUBLIC_LOGIN_URL is not configured");
	}

	const res = await fetch(loginUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	});

	if (!res.ok) {
		let message = `Login failed with status ${res.status}`;
		try {
			const data = (await res.json()) as { message?: string };
			if (data?.message) message = data.message;
		} catch (_) {
			// ignore parse errors
		}
		throw new Error(message);
	}

	const data = (await res.json()) as LoginResponse;
	const token = data.access_token || data.token;
	if (!token || typeof token !== "string") {
		throw new Error("Login response did not include a token");
	}
	return token;
}

function getApiBaseUrl(): string {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://192.168.131.42:8000";
	return baseUrl.replace(/\/$/, "");
}

function getAuthHeaders(): HeadersInit {
	const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
	const headers: HeadersInit = {
		"Content-Type": "application/json",
	};
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	return headers;
}

export async function fetchPosts(): Promise<Post[]> {
	const res = await fetch(`${getApiBaseUrl()}/posts`, {
		method: "GET",
		headers: getAuthHeaders(),
	});

	if (!res.ok) {
		let message = `Failed to fetch posts with status ${res.status}`;
		try {
			const data = (await res.json()) as { message?: string };
			if (data?.message) message = data.message;
		} catch (_) {
			// ignore parse errors
		}
		throw new Error(message);
	}

	const data = (await res.json()) as Post[];
	return data;
}

export async function createPost(content: string): Promise<Post> {
	const res = await fetch(`${getApiBaseUrl()}/posts`, {
		method: "POST",
		headers: getAuthHeaders(),
		body: JSON.stringify({ content }),
	});

	if (!res.ok) {
		let message = `Failed to create post with status ${res.status}`;
		try {
			const data = (await res.json()) as { message?: string };
			if (data?.message) message = data.message;
		} catch (_) {
			// ignore parse errors
		}
		throw new Error(message);
	}

	const data = (await res.json()) as Post;
	return data;
}


export async function updatePost(post: Post): Promise<Post> {
	const res = await fetch(`${getApiBaseUrl()}/posts/${post.id}`, {
		method: "PUT",
		headers: getAuthHeaders(),
		body: JSON.stringify(post),
	});

	if (!res.ok) {
		let message = `Failed to update post with status ${res.status}`;
		try {
			const data = (await res.json()) as { message?: string };
			if (data?.message) message = data.message;
		} catch (_) {
			// ignore parse errors
		}
		throw new Error(message);
	}

	const data = (await res.json()) as Post;
	return data;
}


