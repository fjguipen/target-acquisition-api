import { ParsedScanInfo, ProtocolKind, ScanInfo } from '../../types';

export abstract class Protocol {
  abstract applyRule(data: ScanInfo[]): ScanInfo[];
}

export abstract class FilteringProtocol extends Protocol {
  static kind: ProtocolKind = 'filter';
  variant: 'prioritize' | 'avoid';
  protected abstract testRule(data: ParsedScanInfo): boolean;
  protected abstract prioritize(data: ParsedScanInfo[]): ParsedScanInfo[];
  protected abstract avoid(data: ParsedScanInfo[]): ParsedScanInfo[];
  protected abstract applyVariant(data: ParsedScanInfo[]): ParsedScanInfo[];
  applyRule(data: ParsedScanInfo[]): ParsedScanInfo[] {
    return this.applyVariant(data);
  }
}
export abstract class SortingProtocol extends Protocol {
  static kind: ProtocolKind = 'sort';
  protected abstract sort(data: ParsedScanInfo[]): ParsedScanInfo[];
  applyRule(data: ParsedScanInfo[]): ParsedScanInfo[] {
    return this.sort(data);
  }
}
