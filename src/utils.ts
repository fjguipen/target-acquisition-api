import { Coords } from './types';

export function getDistanceBetween2Points(
  pointA: Coords,
  pointB?: Coords
): number {
  pointB = pointB || { x: 0, y: 0 };

  return Math.sqrt(
    Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2)
  );
}
