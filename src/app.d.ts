import type { User } from '$lib/repositories/user.repository';
import type { Chain } from '$lib/repositories/chain.repository';
import type { StoredIEntity } from '$lib/services/kv.service';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		public interface Locals {
			user: (User & StoredIEntity) | null;
			chain: (Chain & StoredIEntity) | null;
			expense: (Expense & StoredIEntity) | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
