import type { Session } from '@auth/core/types';
import type { User, UserChurros } from '$lib/types/types';

console.log('app LOADED'); //debug

// definie que l'uid est un types string
declare module '@auth/core/types' {
	interface Session {
		uid?: string;
		is1A?: boolean;
	}
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: () => Promise<Session | null>;
			user?: User | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
