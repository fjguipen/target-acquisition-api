import { ParsedScanInfo } from '../../types';
import { FilteringProtocol } from './Protocol';
import { FilteringProtocolVariant } from './types';

type ProtocolEnemyType = 'mech';
export type EnemyTypeProtocolOptions = {
  variant: FilteringProtocolVariant;
  enemyType: ProtocolEnemyType;
};

export class EnemyTypeProtocol extends FilteringProtocol {
  enemyType: ProtocolEnemyType;

  constructor({ variant, enemyType }: EnemyTypeProtocol) {
    super();
    this.enemyType = enemyType;
    this.variant = variant;
  }

  protected testRule(scan: ParsedScanInfo) {
    const result = scan.enemies.type === this.enemyType;
    return result;
  }

  protected prioritize(data: ParsedScanInfo[]) {
    const result = data.filter((scan) => this.testRule(scan));
    return result?.length > 0 ? result : data;
  }

  protected avoid(data: ParsedScanInfo[]) {
    return data.filter((scan) => !this.testRule(scan));
  }

  protected applyVariant(data: ParsedScanInfo[]) {
    return this[this.variant](data);
  }
}
