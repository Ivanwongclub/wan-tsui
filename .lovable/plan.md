## Root cause

`ScrollToTop` in `src/layouts/MainLayout.tsx` runs `window.scrollTo({ top: 0 })` whenever `pathname` changes. When a footer link navigates from e.g. `/` to `/services#service-02`, the pathname changes, so:

1. Router navigates and scrolls to the `#service-02` anchor.
2. `ScrollToTop`'s effect fires on the pathname change and yanks the page back to the top.
3. The browser then resolves the hash again → page jumps back down.

That's the "flash to top, then back to section" the user sees.

## Fix

Make `ScrollToTop` skip the reset when the destination has a hash, and also subscribe to `hash` so same-page hash changes still behave correctly.

In `src/layouts/MainLayout.tsx`:

```tsx
function ScrollToTop() {
  const { pathname, hash } = useRouterState({
    select: (s) => ({ pathname: s.location.pathname, hash: s.location.hash }),
  });

  useEffect(() => {
    if (hash) return; // let the router scroll to the anchor
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
```

No other files need to change. `scroll-margin-top` and smooth scroll behavior already added previously remain intact.

## Verification

- Click a footer link with a hash (e.g. 服務 → 普通科) from `/` → page lands directly on `#service-01` with no flash to top.
- Click a footer link without a hash → still scrolls to top of the new route.
- In-page hash links and direct loads of `/services#service-03` continue to work.
