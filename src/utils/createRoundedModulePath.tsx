type modulePathArguments = {
  x: number;
  y: number;
  isDark: (x: number, y: number) => number;
  r?: number;
};

export const createRoundedModulePath = (
  args: modulePathArguments
): string[] => {
  const { x, y, isDark, r = 0.25 } = args;

  const top = isDark(x, y - 1);
  const bottom = isDark(x, y + 1);
  const left = isDark(x - 1, y);
  const right = isDark(x + 1, y);

  const paths = [];

  if (!top && !right) {
    paths.push(
      `M ${x + 1 - r} ${y} A ${r} ${r} 0 0 1 ${x + 1} ${y + r} L ${
        x + 1
      } ${y} Z`
    );
  }

  if (!top && !left) {
    paths.push(`M ${x} ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} L ${x} ${y} Z`);
  }

  if (!bottom && !right) {
    paths.push(
      `M ${x + 1} ${y + 1 - r} A ${r} ${r} 0 0 1 ${x + 1 - r} ${y + 1} L ${
        x + 1
      } ${y + 1} Z`
    );
  }

  if (!bottom && !left) {
    paths.push(
      `M ${x + r} ${y + 1} A ${r} ${r} 0 0 1 ${x} ${y + 1 - r} L ${x} ${
        y + 1
      } Z`
    );
  }

  return paths;
};
