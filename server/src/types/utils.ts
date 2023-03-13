export type Replace<T, TOverride> = Omit<T, keyof TOverride> & TOverride
