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
 * @param callback String generator
 * @returns The generated and checked id.
 */
export function nextId(ids: string[], generator: () => string = generateId): string {
    let id: string;
    do {
        id = generator();
    } while (ids.includes(id));
    return id;
}

