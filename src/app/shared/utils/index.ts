export function formatField(field: string): string {
  return field.replace(/\s+/g, ' ').trim();
}

export function createArrayOfId(array: { id?: number }[]): number[] {
  return array.map(item => {
    if (item.id === undefined) throw new Error('id is undefined');

    return item.id;
  });
}
