export interface ProjectStore {
  setSecurityAlert: (active: boolean) => void;
}
const defaultState: ProjectStore = { setSecurityAlert: (active: boolean) => {} };
export function useProjectStore(): ProjectStore;
export function useProjectStore<T>(selector: (state: ProjectStore) => T): T;
export function useProjectStore<T>(selector?: (state: ProjectStore) => T) {
  return selector ? selector(defaultState) : defaultState;
}