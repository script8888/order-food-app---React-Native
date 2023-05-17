export default function addDecimal(number) {
  if (Number.isInteger(number)) {
    return number.toFixed(1);
  }
  return number.toString();
}
