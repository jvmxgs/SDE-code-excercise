export default function (costMatrix) {
  const rows = costMatrix.length;
  const cols = costMatrix[0].length;

  const colsMin = Array(cols).fill(Infinity);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (costMatrix[i][j] < colsMin[j]) {
        colsMin[j] = costMatrix[i][j];
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      costMatrix[i][j] -= colsMin[j];
    }
  }

  const rowsMin = costMatrix.map(row => Math.min(...row));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      costMatrix[i][j] -= rowsMin[i];
    }
  }

  const match = Array(cols).fill(-1);
  const visitedRows = Array(rows).fill(false);
  const visitedCols = Array(cols).fill(false);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (costMatrix[i][j] === 0 && match[j] === -1) {
        match[j] = i;
        visitedRows[i] = true;
        visitedCols[j] = true;
        break;
      }
    }
  }

  let pathFound = false;
  while (!pathFound) {
    let zeroRow = -1;
    let zeroCol = -1;

    for (let i = 0; i < rows; i++) {
      if (!visitedRows[i]) {
        for (let j = 0; j < cols; j++) {
          if (!visitedCols[j] && costMatrix[i][j] === 0) {
            zeroRow = i;
            zeroCol = j;
            break;
          }
        }
      }
      if (zeroRow !== -1) {
        break;
      }
    }

    if (zeroRow === -1) {
      pathFound = true;
    } else {
      let starCol = -1;
      for (let j = 0; j < cols; j++) {
        if (match[j] === -1 && costMatrix[zeroRow][j] === 0) {
          starCol = j;
          break;
        }
      }

      if (starCol !== -1) {
        match[starCol] = zeroRow;
        visitedRows[zeroRow] = true;
        visitedCols[starCol] = true;
      } else {
        const path = findAugmentingPath(match, zeroRow, visitedCols);
        const newPath = [...path, zeroCol];
        flipPath(match, newPath);
        visitedRows.fill(false);
        visitedCols.fill(false);
      }
    }
  }

  const assignment = match.map((row, col) => [row, col]);
  return assignment;
}

function findAugmentingPath(match, row, visitedCols) {
  const cols = match.length;
  for (let col = 0; col < cols; col++) {
    if (visitedCols[col]) {
      continue;
    }
    if (match[col] === row) {
      return [col];
    }
    visitedCols[col] = true;
    const nextRow = match[col];
    const path = findAugmentingPath(match, nextRow, visitedCols);
    if (path.length > 0) {
      return [col, ...path];
    }
  }
  return [];
}

function flipPath(match, path) {
  for (let i = 0; i < path.length; i += 2) {
    const col = path[i];
    const row = path[i + 1];
    match[col] = row;
  }
}