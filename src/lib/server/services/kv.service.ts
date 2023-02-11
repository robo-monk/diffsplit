import dotenv from 'dotenv';
import { nanoid } from 'nanoid';
import { merge, omit } from 'lodash-es';
dotenv.config();

export interface StoredBaseKvEntityInterface {
    id: string;
}

export interface BaseKvEntityInterface {
}

enum InMemoryActions {
    Create = '_create', Update = '_update', Delete = '_delete', Get = '_get'
}
export class KVRepository<T extends BaseKvEntityInterface> {
    private readonly kv = new KVService();
    private readonly state = new Map<InMemoryActions, (T & StoredBaseKvEntityInterface)[]>();

    #generateKey() {
        return nanoid()
    }

    private pushToState(action: InMemoryActions, value: (T & StoredBaseKvEntityInterface)) {
        this.state.set(action, [...(this.state.get(action) || []), value]);
    }

    create(value: T): T & StoredBaseKvEntityInterface {
        const obj: (T & StoredBaseKvEntityInterface) = {
            id: this.#generateKey(),
            ...value
        };

        this.pushToState(InMemoryActions.Create, obj);
        return obj
    }



    private async _create(value: T & StoredBaseKvEntityInterface) {
        const res = await this.kv.putRaw(value.id, JSON.stringify(
            omit(value, ['id'])
        ));
        if (!res) throw new Error('Failed to create');
        return value;
    }

    private async _update(value: T & StoredBaseKvEntityInterface) {
        const entity = await this.get(value.id);
        if (!entity) throw new Error('Entity not found');
        const merged = merge(entity, value);
        const res = await this.kv.putRaw(value.id, JSON.stringify(omit(merged, 'id')));
        if (!res) throw new Error('Failed to update');
        return merged;
    }

    private async _delete(value: T & StoredBaseKvEntityInterface) {
        throw new Error('Not implemented');
        // const res = await this.kv.putRaw(value.id, JSON.stringify(value));
        // if (!res) throw new Error('Failed to create');
        // return value;
    }

    private async _get(value: T & StoredBaseKvEntityInterface) {
        // throw new Error('Not implemented');
    }



    update(value: T & StoredBaseKvEntityInterface): T & StoredBaseKvEntityInterface {
        throw new Error('Not implemented update');
        return {} as T & StoredBaseKvEntityInterface
    }

    delete(value: T & StoredBaseKvEntityInterface): T & StoredBaseKvEntityInterface {
        throw new Error('Not implemented delete');
        return {} as T & StoredBaseKvEntityInterface
    }

    async get(key: string): Promise<T | undefined> {
        const inMemory = this.state.get(InMemoryActions.Get)?.find(v => v.id === key);
        if (inMemory) return inMemory;

        const value = await this.kv.getRaw(key);
        try {
            if (!value) throw new Error('Value is undefined');
            const obj = JSON.parse(value);
            this.pushToState(InMemoryActions.Get, { ...obj, id: key });
            return obj;
        } catch (e) {
            console.error(e);
            return void 0;
        }
    }

    async mutate(key: string, cb: (value: T) => T) {
        const value = await this.get(key);
        if (!value) throw new Error('Value is undefined');
        const newValue = cb(value);
        return await this._update({ ...newValue, id: key });
        // return await this.kv.putRaw(key, JSON.stringify(newValue));
    }



    async flush() {
        this.state.forEach(async (values, action) => {
            values.forEach(async (value) => {
                this[action](value);
            })
        })

        this.state.clear();
    }
}

export class KVService {
    get headers() {
        return {
            'Content-Type': 'application/json',
            // 'X-Auth-Email': '',
            'Authorization': `Bearer ${process.env.CF_API_KEY}` || ''
        }
    }

    #getURLKey(key: string) {
        return `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/storage/kv/namespaces/${process.env.CF_KV_NAMESPACE_ID}/values/${key}`
    }

    async getRaw(key: string): Promise<string | undefined> {
        const res = await fetch(this.#getURLKey(key), {
            method: 'GET',
            headers: this.headers
        }).catch(e => {
            console.error(e)
            return void 0
        })
        return await res?.text()
        // return res?.json();
    }


    async putRaw(key: string, value: string): Promise<boolean | undefined> {
        const res = await fetch(this.#getURLKey(key), {
            method: 'PUT',
            headers: this.headers,
            body: value
        }).catch(e => {
            console.error(e)
            return void 0
        })
        return res?.ok
    }

}



// const kv = new KVService();
// const res1 = await kv.putRaw('te2t', 'test');
// const res = await kv.getRaw('te2t');
// console.log('res', res)
