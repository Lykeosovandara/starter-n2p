import type { Shop } from "./shop"
import type { User } from "./user"

export type Activity = {
    user: User,
    id: number,
    shopInterested?: number,
    shop: Shop,
    createdDt: string,
    status: ActivityStatus
}
export enum ActivityStatus {
    open = "open",
    closed = "close",
}