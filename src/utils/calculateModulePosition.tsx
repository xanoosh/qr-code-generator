export const calculateModulePosition = (
  x: number,
  y: number,
  isDark: (x: number, y: number) => number
) => {
  const top = isDark(x, y - 1);
  const bottom = isDark(x, y + 1);
  const left = isDark(x - 1, y);
  const right = isDark(x + 1, y);

  const expand = 0.02;

  let xPos = x;
  let yPos = y;
  let w = 1;
  let h = 1;

  if (left) {
    xPos -= expand;
    w += expand;
  }
  if (right) {
    w += expand;
  }
  if (top) {
    yPos -= expand;
    h += expand;
  }
  if (bottom) {
    h += expand;
  }

  return {
    xPos,
    yPos,
    w,
    h,
  };
};
