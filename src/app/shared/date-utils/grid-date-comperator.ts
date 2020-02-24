export class GridDateComperator {
  static dateComparator(cellValue: string, filterLocalDateAtMidnight) {
    if (!cellValue) {
      return 1;
    }
    const dateParts = cellValue.substr(0, 10).split("-");
    const day = Number(dateParts[2]);
    const month = Number(dateParts[1]) - 1;
    const year = Number(dateParts[0]);
    const cellDate = new Date(year, month, day);
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    } else if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    } else {
      return 0;
    }
  }
}
