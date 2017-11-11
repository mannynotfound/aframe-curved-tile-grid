import {flatMapDeep} from 'lodash';
import {createEl} from './index';

const desktopGrid = [
  {
    rows: [
      {
        posY: 2,
        rowHeight: 2,
        radius: 6,
        cols: [
          {width: 21, rotY: 210.5},
          {width: 30, rotY: 180.5},
          {width: 15, rotY: 165.5, height: 1, posY: 2.5},
          {width: 15, rotY: 150.5, height: 1, posY: 2.5},
          {width: 15, rotY: 165.5, height: 1, posY: 1.5},
          {width: 15, rotY: 150.5, height: 1, posY: 1.5},
          {width: 21, rotY: 129.5},
        ],
      },
      {
        posY: 0,
        rowHeight: 2,
        radius: 6,
        cols: [
          {width: 10.5, rotY: 221},
          {width: 10.5, rotY: 210.5},
          {width: 30, rotY: 180.5},
          {width: 30, rotY: 150.5},
          {width: 10.5, rotY: 140, height: 1, posY: 0.5},
          {width: 10.5, rotY: 129.5, height: 1, posY: 0.5},
          {width: 10.5, rotY: 140, height: 1, posY: -0.5},
          {width: 10.5, rotY: 129.5, height: 1, posY: -0.5},
        ],
      },
      {
        posY: -2,
        rowHeight: 2,
        radius: 6,
        cols: [
          {width: 21, rotY: 210.5},
          {width: 30, rotY: 180.5},
          {width: 15, rotY: 165.5},
          {width: 15, rotY: 150.5},
          {width: 21, rotY: 129.5},
        ],
      },
    ],
  },
];

const mobileGrid = [
  {
    rows: [
      {
        posY: 3,
        rowHeight: 2,
        radius: 6,
        cols: [
          {width: 25, rotY: 205.5},
          {width: 25, rotY: 180.5},
          {width: 25, rotY: 155.5},
          {width: 25, rotY: 130.5},
        ],
      },
      {
        posY: 1,
        rowHeight: 2,
        radius: 6,
        cols: [
          {width: 25, rotY: 205.5},
          {width: 25, rotY: 180.5},
          {width: 25, rotY: 155.5},
          {width: 25, rotY: 130.5},
        ],
      },
      {
        posY: -1,
        rowHeight: 2,
        radius: 6,
        cols: [
          {width: 25, rotY: 205.5},
          {width: 25, rotY: 180.5},
          {width: 25, rotY: 155.5},
          {width: 25, rotY: 130.5},
        ],
      },
      {
        posY: -3,
        rowHeight: 2,
        radius: 6,
        cols: [
          {width: 25, rotY: 205.5},
          {width: 25, rotY: 180.5},
          {width: 25, rotY: 155.5},
          {width: 25, rotY: 130.5},
        ],
      },
    ],
  },
];

export default (content, el) => {
  const isMobile = AFRAME.utils.device.isMobile();
  const gridType = isMobile ? mobileGrid : desktopGrid;

  const flattenedGrid = flatMapDeep(gridType, grid => (
    grid.rows.map((row, rowIdx) => (
      row.cols.map((col, colIdx) => ({row, rowIdx, col, colIdx}))
    ))
  ));

  const zDepth = isMobile ? -3 : 0;

  flattenedGrid.forEach(({row, rowIdx, col, colIdx}, index) => {
    createEl('a-curvedimage', [
      ['id', `tile__${rowIdx}_${colIdx}`],
      ['tile', {
        index,
        radius: row.radius,
        ogHeight: (col.height || row.rowHeight) - 0.1,
        ogWidth: col.width - 1,
        ogPos: JSON.stringify({x: 0, y: col.posY || row.posY, z: zDepth}),
        ogRot: JSON.stringify({x: 0, y: col.rotY, z: 0}),
        content: JSON.stringify(content[index]),
      }],
    ], el);
  });
};
