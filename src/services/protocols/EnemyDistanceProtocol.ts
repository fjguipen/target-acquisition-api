import { getDistanceBetween2Points } from '../../utils';
import { ParsedScanInfo } from '../../types';
import { SortingProtocol } from './Protocol';

type PROTOCOL_VARIANT = 'furthest' | 'closest';
export type EnemyDistanceProtocolOptions = {
  variant: PROTOCOL_VARIANT;
};

export class EnemyDistanceProtocol extends SortingProtocol {
  variant: PROTOCOL_VARIANT;

  constructor({ variant }: EnemyDistanceProtocolOptions) {
    super();
    this.variant = variant;
  }

  protected sort(data: ParsedScanInfo[]) {
    const order = this.variant === 'closest' ? 1 : -1;

    const result = data.sort((a, b) => {
      const dA = getDistanceBetween2Points(a.coordinates);
      const dB = getDistanceBetween2Points(b.coordinates);

      return (dA - dB) * order;
    });

    return result;
  }
}
