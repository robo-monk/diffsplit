import dotenv from 'dotenv';
import { nanoid } from 'nanoid';
import { merge, omit } from 'lodash-es';
dotenv.config();

export interface StoredIEntity {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IEntity {
}

enum InMemoryActions {
    Create = '_create', Update = '_update', Delete = '_delete', Get = '_get'
}
export class KVRepository<T extends IEntity> {
    private readonly kv = new KVService();
    private readonly state = new Map<InMemoryActions, (T & StoredIEntity)[]>();

    #generateKey() {
        return nanoid()
    }

    private pushToState(action: InMemoryActions, value: (T & StoredIEntity)) {
        this.state.set(action, [...(this.state.get(action) || []), value]);
    }

    create(value: T): T & StoredIEntity {
        const obj: (T & StoredIEntity) = {
            id: this.#generateKey(),
            ...value
        };

        this.pushToState(InMemoryActions.Create, obj);
        return obj
    }



    private async _create(value: T & StoredIEntity) {
        value.createdAt = new Date();
        const res = await this.kv.put(value);
        if (!res) throw new Error('Failed to create');
        return value;
    }

    private async _update(value: T & StoredIEntity) {
        const entity = await this.get(value.id);
        if (!entity) throw new Error('Entity not found');
        const merged = merge(entity, value);
        const res = await this.kv.put(merged);
        if (!res) throw new Error('Failed to update');
        return merged;
    }

    private async _delete(value: T & StoredIEntity) {
        throw new Error('Not implemented');
        // const res = await this.kv.putRaw(value.id, JSON.stringify(value));
        // if (!res) throw new Error('Failed to create');
        // return value;
    }

    private async _get(value: T & StoredIEntity) {
        // throw new Error('Not implemented');
    }



    update(value: T & StoredIEntity): T & StoredIEntity {
        this.pushToState(InMemoryActions.Update, value);
        return value
    }

    delete(value: T & StoredIEntity): T & StoredIEntity {
        throw new Error('Not implemented delete');
        return {} as T & StoredIEntity
    }

    async get(key: string): Promise<(T & StoredIEntity) | undefined> {
        const inMemory = this.state.get(InMemoryActions.Get)?.find(v => v.id === key);
        if (inMemory) return inMemory;

        const value = await this.kv.getRaw(key);
        try {
            if (!value) throw new Error('Value is undefined');
            const obj = { ...JSON.parse(value), id: key } as (T & StoredIEntity);
            this.pushToState(InMemoryActions.Get, obj);
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
        return await this.update({ ...newValue, id: key });
    }

    async findOrCreate(key: string, cb?: () => T): Promise<T & StoredIEntity> {
        const value = await this.get(key);
        if (value) return value;

        const newValue = cb ? await cb() : this.create({} as T);
        return this.create({ ...newValue, id: key });
    }




    async flush() {
        const promises$ = Array.from(this.state.entries()).map(async ([action, values]) => {
            await Promise.all(values.map((value) => this[action](value)))
        })

        await Promise.all(promises$);

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


    async put(value: StoredIEntity): Promise<boolean | undefined> {
        const key = value.id;
        value.updatedAt = new Date();
        return await this.putRaw(key, JSON.stringify(omit(value, 'id')))
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
