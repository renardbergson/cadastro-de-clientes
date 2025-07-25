export function formatDateToIso(stringDate: string): string {
  const [day, month, year] = [
    Number(stringDate.slice(0, 2)),
    Number(stringDate.slice(2, 4)),
    Number(stringDate.slice(4))
  ]
  const date = new Date(year, month-1, day);
  return date.toISOString();
}

export function formatDateToBR(stringDate: string): string {
  return new Date(stringDate).toLocaleDateString('pt-BR');
}