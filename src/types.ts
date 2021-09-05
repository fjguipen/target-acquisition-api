export const PROTOCOLS = [
  'closest-enemies',
  'furthest-enemies',
  'assist-allies',
  'avoid-crossfire',
  'prioritize-mech',
  'avoid-mech',
] as const;

export type ProtocolKind = 'sort' | 'filter';

export const ENEMY_TYPES = ['soldier', 'mech'];

export type ProtocolKeyName = typeof PROTOCOLS[number];

export type Coords = {
  x: number;
  y: number;
};

export type Enemy = {
  type: typeof ENEMY_TYPES[number];
  number: number;
};

export interface ScanInfo {
  coordinates: Coords;
  enemies: Enemy;
  allies?: number;
}

export interface ParsedScanInfo extends ScanInfo {
  distance: number;
}

export type RadarInfoPayload = {
  protocols: ProtocolKeyName | ProtocolKeyName[];
  scan: ScanInfo[];
};

export interface ParsedRadarInfoPayload extends RadarInfoPayload {
  scan: ParsedScanInfo[];
}

export type TargetAcquired = Coords;
