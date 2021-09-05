import { RadarInfoPayload } from '../../types';
import { TargetAcquisition } from '.';

const mock: RadarInfoPayload = {
  protocols: [],
  scan: [
    {
      coordinates: { x: 0, y: 40 },
      allies: 2,
      enemies: {
        type: 'mech',
        number: 3,
      },
    },
    {
      coordinates: { x: 0, y: 45 },
      allies: 2,
      enemies: {
        type: 'soldier',
        number: 3,
      },
    },
    {
      coordinates: { x: 15, y: 5 },
      enemies: {
        type: 'soldier',
        number: 1,
      },
    },
  ],
};

test('Target accquisiton: closest enemy', async () => {
  mock.protocols = ['closest-enemies'];
  const target = new TargetAcquisition(mock).aplyRules();
  expect(target).toStrictEqual(mock.scan[2].coordinates);
});

test('Target accquisiton: prioritize allies', async () => {
  mock.protocols = ['closest-enemies', 'assist-allies'];
  const target = new TargetAcquisition(mock).aplyRules();
  expect(target).toStrictEqual(mock.scan[0].coordinates);
});

test('Target accquisiton: avoid mech', async () => {
  mock.protocols = ['closest-enemies', 'assist-allies', 'avoid-mech'];
  const target = new TargetAcquisition(mock).aplyRules();
  console.log(target);
  expect(target).toStrictEqual(mock.scan[1].coordinates);
});
