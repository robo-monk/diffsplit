import type { IEntity } from "../services/kv.service";

interface Split {
    userId: string;
    amount: number
}

export interface Expense extends IEntity {
    name: string;
    amount: number;
    splits: Split[];
}
