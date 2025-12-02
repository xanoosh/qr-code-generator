type ModulePathArguments = {
  x: number;
  y: number;
  isDark: (x: number, y: number) => number;
  rounded?: number;
};

export const createRoundedModulePath = (
  args: ModulePathArguments
): string[] => {
  const { x, y, isDark, rounded = 0.25 } = args;

  const top = isDark(x, y - 1);
  const bottom = isDark(x, y + 1);
  const left = isDark(x - 1, y);
  const right = isDark(x + 1, y);

  const paths: string[] = [];

  const radius = rounded;
  const expand = 0.02;

  if (!top && !right) {
    const startX = x + 1 - radius - expand;
    const startY = y - expand;
    const endX = x + 1 + expand;
    const endY = y + radius + expand;

    paths.push(
      [
        `M ${startX} ${startY}`,
        `A ${radius + expand} ${radius + expand} 0 0 1 ${endX} ${endY}`,
        `L ${x + 1 + expand} ${y - expand}`,
        'Z',
      ].join(' ')
    );
  }

  if (!top && !left) {
    const startX = x - expand;
    const startY = y + radius + expand;
    const endX = x + radius + expand;
    const endY = y - expand;

    paths.push(
      [
        `M ${startX} ${startY}`,
        `A ${radius + expand} ${radius + expand} 0 0 1 ${endX} ${endY}`,
        `L ${x - expand} ${y - expand}`,
        'Z',
      ].join(' ')
    );
  }

  if (!bottom && !right) {
    const startX = x + 1 + expand;
    const startY = y + 1 - radius - expand;
    const endX = x + 1 - radius - expand;
    const endY = y + 1 + expand;

    paths.push(
      [
        `M ${startX} ${startY}`,
        `A ${radius + expand} ${radius + expand} 0 0 1 ${endX} ${endY}`,
        `L ${x + 1 + expand} ${y + 1 + expand}`,
        'Z',
      ].join(' ')
    );
  }

  if (!bottom && !left) {
    const startX = x + radius + expand;
    const startY = y + 1 + expand;
    const endX = x - expand;
    const endY = y + 1 - radius - expand;

    paths.push(
      [
        `M ${startX} ${startY}`,
        `A ${radius + expand} ${radius + expand} 0 0 1 ${endX} ${endY}`,
        `L ${x - expand} ${y + 1 + expand}`,
        'Z',
      ].join(' ')
    );
  }

  return paths;
};
