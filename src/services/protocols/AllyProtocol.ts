import { ParsedScanInfo } from '../../types';
import { FilteringProtocol } from './Protocol';
import { FilteringProtocolVariant } from './types';

export type AllyProtocolOptions = {
  variant: FilteringProtocolVariant;
};

export class AllyProtocol extends FilteringProtocol {
  constructor({ variant }: AllyProtocolOptions) {
    super();
    this.variant = variant;
  }

  protected testRule(scan: ParsedScanInfo) {
    return scan.allies && scan.allies > 0;
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
