import type { Cookies } from "@sveltejs/kit";
import type { StoredIEntity } from "./kv.service";

export class CookieService {
    constructor(private readonly cookies: Cookies) {}

    storeEntity<T extends StoredIEntity>(entity: T & StoredIEntity, key: string = entity.id) {
        this.cookies.set(key, JSON.stringify(entity));
    }

    getEntity<T>(id: string): (T & StoredIEntity) | null {
        return JSON.parse(this.cookies.get(id) || 'null');
    }
}
