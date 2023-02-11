import { BaseKvEntityInterface, KVEntity } from "../services/kv.service";

interface Chain extends BaseKvEntityInterface {
    name: string;
}

export class ChainEntity extends KVEntity<Chain> {

}

const chain = new ChainEntity()

chain.put({ id: '123', name: 'test' })
