export function searchByText<T>(
  items: T[],
  query: string,
  fields: (keyof T)[]
): T[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return items;

  return items.filter((item) =>
    fields.some((field) => {
      const value = String(item[field]).toLowerCase();
      return value.includes(normalizedQuery);
    })
  );
}