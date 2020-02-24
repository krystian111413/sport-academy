export class NumberFormatter {
   static commaFormat(number: number): string {
    let numberAsString = String(number);
    if (!numberAsString || (numberAsString && numberAsString.length <= 3)) {
      return numberAsString;
    }
    const parts: string[] = [];
    while (numberAsString.length > 3) {
      const numberPart = numberAsString.substr(numberAsString.length - 3);
      parts.unshift(numberPart);
      numberAsString = numberAsString.substr(0, numberAsString.length - 3);
    }
    if (numberAsString.length > 0) {
      parts.unshift(numberAsString);
    }
    numberAsString = parts.join(',');
    return numberAsString
  }

}
