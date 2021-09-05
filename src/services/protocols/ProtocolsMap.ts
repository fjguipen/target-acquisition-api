import { ProtocolKeyName } from '../../types';
import { AllyProtocol, AllyProtocolOptions } from './AllyProtocol';
import {
  EnemyDistanceProtocol,
  EnemyDistanceProtocolOptions,
} from './EnemyDistanceProtocol';
import {
  EnemyTypeProtocol,
  EnemyTypeProtocolOptions,
} from './EnemyTypeProtocol';

type ProtocolService =
  | {
      protocol: typeof AllyProtocol;
      options: AllyProtocolOptions;
    }
  | {
      protocol: typeof EnemyDistanceProtocol;
      options: EnemyDistanceProtocolOptions;
    }
  | {
      protocol: typeof EnemyTypeProtocol;
      options: EnemyTypeProtocolOptions;
    };

const ProtocolsMap = new Map<ProtocolKeyName, ProtocolService>([
  [
    'closest-enemies',
    {
      protocol: EnemyDistanceProtocol,
      options: {
        variant: 'closest',
      },
    },
  ],
  [
    'furthest-enemies',
    {
      protocol: EnemyDistanceProtocol,
      options: {
        variant: 'furthest',
      },
    },
  ],
  [
    'assist-allies',
    {
      protocol: AllyProtocol,
      options: {
        variant: 'prioritize',
      },
    },
  ],
  [
    'avoid-crossfire',
    {
      protocol: AllyProtocol,
      options: {
        variant: 'avoid',
      },
    },
  ],
  [
    'prioritize-mech',
    {
      protocol: EnemyTypeProtocol,
      options: {
        variant: 'prioritize',
        enemyType: 'mech',
      },
    },
  ],
  [
    'avoid-mech',
    {
      protocol: EnemyTypeProtocol,
      options: {
        variant: 'avoid',
        enemyType: 'mech',
      },
    },
  ],
]);

export default ProtocolsMap;
