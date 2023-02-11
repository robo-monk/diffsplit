import dotenv from 'dotenv';
import nanoid from 'nanoid';

dotenv.config();

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

export class KVEntity<T> {
    private readonly kv = new KVService();

    #generateKey() {
        return nanoid()
    }

    async put(value: T) {
        const key = this.#generateKey();
        return await this.kv.putRaw(key, JSON.stringify(value));
    }

    async get(key: string): Promise<T | undefined> {
        const value = await this.kv.getRaw(key);
        try {
            if (!value) throw new Error('Value is undefined');
            return JSON.parse(value);
        } catch (e) {
            console.error(e);
            return void 0;
        }
    }
}


// const kv = new KVService();
// const res1 = await kv.putRaw('te2t', 'test');
// const res = await kv.getRaw('te2t');
// console.log('res', res)
