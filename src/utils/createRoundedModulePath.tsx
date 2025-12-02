type modulePathArguments = {
  x: number;
  y: number;
  edges: {
    topEmpty: boolean;
    rightEmpty: boolean;
    bottomEmpty: boolean;
    leftEmpty: boolean;
  };
  r?: number;
};

export const createRoundedModulePath = (args: modulePathArguments): string => {
  const {
    x,
    y,
    edges: { topEmpty, rightEmpty, bottomEmpty, leftEmpty },
    r = 0.4,
  } = args;
  let d = `M ${x} ${y}`;

  if (topEmpty && rightEmpty) {
    d += ` h ${1 - r}`;
    d += ` A ${r} ${r} 0 0 1 ${x + 1} ${y + r}`;
  } else if (topEmpty && leftEmpty) {
    d = `M ${x} ${y + r}`;
    d += ` A ${r} ${r} 0 0 1 ${x + r} ${y}`;
    d += ` H ${x + 1}`;
  } else {
    d += ` h 1`;
  }

  if (rightEmpty && bottomEmpty) {
    d += ` v ${1 - r}`;
    d += ` A ${r} ${r} 0 0 1 ${x + 1 - r} ${y + 1}`;
  } else if (rightEmpty && topEmpty) {
    d += ` V ${y + 1}`;
  } else {
    d += ` v 1`;
  }

  if (bottomEmpty && leftEmpty) {
    d += ` h ${-1 + r}`;
    d += ` A ${r} ${r} 0 0 1 ${x} ${y + 1 - r}`;
  } else if (bottomEmpty && rightEmpty) {
    d += ` H ${x}`;
  } else {
    d += ` h -1`;
  }

  if (leftEmpty && topEmpty) {
    d += ` v ${-1 + r}`;
    d += ` A ${r} ${r} 0 0 1 ${x + r} ${y}`;
  } else if (leftEmpty && bottomEmpty) {
    d += ` V ${y}`;
  } else {
    d += ` v -1`;
  }

  d += ' Z';
  return d;
};
