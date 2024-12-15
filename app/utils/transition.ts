const visibleStatus: string[] = ['entering', 'entered'];

/**
 * Is the given TransitionStatus visible?
 */
export const isVisible = (status: string): boolean => visibleStatus.includes(status);

/**
 * Is the given TransitionStatus hidden?
 */
export const isHidden = (status: string): boolean => !visibleStatus.includes(status);

/**
 * Forces a reflow to trigger transitions on enter
 */
export const reflow = (node: HTMLElement | null): number | void => {
  return node ? node.offsetHeight : undefined;
};