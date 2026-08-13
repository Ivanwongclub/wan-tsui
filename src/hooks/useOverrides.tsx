import { createContext, useContext, type ReactNode } from 'react';
import { EMPTY_OVERRIDES, type SiteOverrides } from '../lib/siteContent.server';

const OverridesContext = createContext<SiteOverrides | null>(null);

export function OverridesProvider({
  overrides,
  children,
}: {
  overrides: SiteOverrides | null | undefined;
  children: ReactNode;
}) {
  return (
    <OverridesContext.Provider value={overrides ?? EMPTY_OVERRIDES}>
      {children}
    </OverridesContext.Provider>
  );
}

/** Never throws: returns empty arrays when no provider is mounted. */
export function useOverrides(): SiteOverrides {
  return useContext(OverridesContext) ?? EMPTY_OVERRIDES;
}
