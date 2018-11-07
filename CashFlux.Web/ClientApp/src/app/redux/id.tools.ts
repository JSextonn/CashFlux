/**
 * Generates random strings of length 7 using 36 characters.
 * @returns The generated string.
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Generates strings from a given callback until
 * the string is not contained in the passed list of strings.
 *
 * @param ids The ids that should not be duplicated
 * @param generator String generator
 * @returns The generated and checked id.
 */
export function nextId(ids: string[], generator: () => string = generateId): string {
  let id: string;
  do {
    id = generator();
  } while (ids.includes(id));
  return id;
}

/**
 * Given an id, if the variable is undefined a unique id is returned given
 * a list of already in use ids and a generator responsible for generating new ids.
 *
 * @param id The id that will be checked for undefined
 * @param ids The ids that the newly generated id should not be apart of.
 * @param generator The function responsible for generating new ids.
 */
export function currentIdOrNext(id: string, ids: string[], generator: () => string = generateId): string {
  return (id === undefined) ? nextId(ids, generator) : id;
}
