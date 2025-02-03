import { CollectionRequest } from "./collection-request";

export enum ItemType {
  PLASTIC = "PLASTIC",
  GLASS = "GLASS",
  PAPER = "PAPER",
  METAL = "METAL",
}

export interface RequestItem {
  id: number;
  requestId: CollectionRequest;
  wasteType: ItemType;
  weight: number;
  photo?: string;
  createdAt: Date;
}
