import { Droplets, LampWallUp, Road, Trash2, TreePine } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Coordinates, IssueCategory } from './types';

export const MAX_ATTACHMENTS = 4;
export const MAX_ATTACHMENT_SIZE_BYTES = 5 * 1024 * 1024;
export const MAX_DESCRIPTION_LENGTH = 500;
export const DEFAULT_MAP_CENTER: Coordinates = { lat: 12.9716, lng: 77.5946 };

export const ISSUE_CATEGORY_OPTIONS: ReadonlyArray<{ name: IssueCategory; icon: LucideIcon }> = [
  { name: 'Road Damage', icon: Road },
  { name: 'Water Leakage', icon: Droplets },
  { name: 'Garbage', icon: Trash2 },
  { name: 'Street Light', icon: LampWallUp },
  { name: 'Fallen Tree', icon: TreePine },
];
