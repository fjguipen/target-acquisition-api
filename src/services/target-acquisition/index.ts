import { getDistanceBetween2Points } from '../../utils';
import {
  ParsedRadarInfoPayload,
  ProtocolKind,
  RadarInfoPayload,
  ScanInfo,
  TargetAcquired,
} from '../../types';
import { Protocol } from '../protocols/Protocol';
import ProtocolsMap from '../protocols/ProtocolsMap';

const MAXIMUM_DISTANCE = 100;

export class TargetAcquisition {
  private data: ParsedRadarInfoPayload;
  constructor(data: RadarInfoPayload) {
    this.data = this.cleanUpData(data);
  }

  private cleanUpData(data: RadarInfoPayload): ParsedRadarInfoPayload {
    return {
      ...data,
      scan: data.scan.map((scan) => ({
        ...scan,
        distance: getDistanceBetween2Points(scan.coordinates),
      })),
    };
  }

  private getRuleWeight(kind: ProtocolKind) {
    return kind === 'filter' ? 2 : 1;
  }

  aplyRules(): TargetAcquired | null {
    const protocols = (
      Array.isArray(this.data.protocols)
        ? this.data.protocols
        : [this.data.protocols]
    )
      .map((rule) => ProtocolsMap.get(rule))
      .filter((rule) => !!rule)
      .sort(
        (a, b) =>
          this.getRuleWeight(b.protocol.kind) -
          this.getRuleWeight(a.protocol.kind)
      )
      .map((rule) => new rule.protocol(rule.options as any));

    const priorityTargets = protocols.reduce(
      (acc: ScanInfo[], protocol: Protocol) => {
        return protocol.applyRule(acc);
      },
      this.data.scan.filter((scan) => {
        return scan.distance <= MAXIMUM_DISTANCE;
      })
    );

    const result = priorityTargets?.length && priorityTargets[0]?.coordinates;
    return result
      ? {
          x: result.x,
          y: result.y,
        }
      : null;
  }
}
