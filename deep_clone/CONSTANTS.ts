export const towno = {
  a: {
    b: {
      c: {
        d: {
          e: [1, 2, 3],
          f: "random-string",
          g: () => null,
          re: /haha/gi,
          createdAt: new Date()
        }
      }
    },
    j: 999,
    k: [
      {
        l: {
          m: {
            n: 0
          }
        }
      },
      {
        o: 999
      },
      {
        p: [
          {
            q: 999,
            r: [
              {
                s: {
                  t: {
                    u: "deep-string"
                  }
                }
              },
              {
                v: null
              },
              Symbol(
                Math.random()
                  .toString(16)
                  .slice(-7)
              )
            ]
          },
          {
            w: () => null,
            re: /^hello\sworld/gi
          },
          {
            x: {
              y: {
                z: [1, 2]
              }
            }
          }
        ]
      }
    ]
  },
  h: [1, 2],
  i: "random-string-depth-0",
  j: Symbol("haha")
};

export const owno = {
  a: {
    b: {
      c: {
        d: [1, 2, 3]
      }
    },
    e: {
      f: 111,
      g: "deep-string",
      h: [
        { i: 999 },
        {
          j: [
            {
              k: {
                l: "deep-string"
              }
            }
          ]
        }
      ]
    },
    m: null
  },
  n: 999
};

export const awno = [
  [
    [
      {
        a: {
          b: [
            {
              c: [
                [
                  {
                    d: 999
                  }
                ]
              ]
            }
          ]
        },
        e: [[1, 2, 3]]
      }
    ],
    "deep-string",
    1,
    2
  ],
  null,
  "deep-string",
  [1, 2]
];
