import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { MainLayout } from "../layouts/MainLayout";
import { CONTENT } from "../content";
import type { Locale } from "../types/content";
import { I18nProvider, useI18n } from "../hooks/useI18n";
import { OverridesProvider } from "../hooks/useOverrides";
import { fetchSiteOverrides } from "../lib/siteContent.server";

import appCss from "../styles.css?url";

const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/29d5035e-4f77-4083-b404-cdfa464254e6/id-preview-1479ad98--3cd1a002-a29b-4129-9174-273f1d8d5e78.lovable.app-1778660380777.png";

const getInitialLocale = createServerFn({ method: "GET" }).handler(async () => {
  const request = getRequest();
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(/(?:^|;\s*)wt_locale=(tc|en)/);
  return (match?.[1] as Locale | undefined) ?? "tc";
});

function readClientLocale(): Locale {
  const match = document.cookie.match(/(?:^|;\s*)wt_locale=(tc|en)/);
  return (match?.[1] as Locale | undefined) ?? "tc";
}

function htmlLang(locale: Locale) {
  return locale === "tc" ? "zh-HK" : "en";
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: async () => {
    const locale: Locale =
      typeof document === "undefined" ? await getInitialLocale() : readClientLocale();
    return { locale };
  },
  loader: async ({ context }) => ({
    locale: context.locale,
    overrides: await fetchSiteOverrides(),
  }),
  head: ({ loaderData }) => {
    const locale: Locale = loaderData?.locale ?? "tc";
    const meta = CONTENT[locale].meta;
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: meta.title },
        { name: "description", content: meta.desc },
        { name: "author", content: CONTENT[locale].clinic.name },
        { property: "og:title", content: meta.title },
        { property: "og:description", content: meta.desc },
        { property: "og:type", content: "website" },
        { property: "og:image", content: OG_IMAGE },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: meta.title },
        { name: "twitter:description", content: meta.desc_short },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&family=Noto+Serif+TC:wght@500;700&display=swap",
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// Keeps <title>, meta tags and <html lang> in sync after a client-side locale toggle.
function LocaleMeta() {
  const { locale } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const { meta } = CONTENT[locale];
    document.title = meta.title;
    document.documentElement.lang = htmlLang(locale);
    const set = (selector: string, value: string) => {
      document.head.querySelector(selector)?.setAttribute("content", value);
    };
    set('meta[name="description"]', meta.desc);
    set('meta[property="og:title"]', meta.title);
    set('meta[property="og:description"]', meta.desc);
    set('meta[name="twitter:title"]', meta.title);
    set('meta[name="twitter:description"]', meta.desc_short);
  }, [locale, pathname]);

  return null;
}

function RootShell({ children }: { children: React.ReactNode }) {
  const locale = Route.useLoaderData({ select: (d) => d?.locale ?? "tc" });
  const overrides = Route.useLoaderData({ select: (d) => d?.overrides });

  return (
    <html lang={htmlLang(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        <OverridesProvider overrides={overrides}>
          <I18nProvider initialLocale={locale}>
            <LocaleMeta />
            {children}
          </I18nProvider>
        </OverridesProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Admin routes render their own (antd) shell — no public layout, no page transition.
  if (pathname.startsWith("/admin")) {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <div key={pathname} className="page-transition">
          <Outlet />
        </div>
      </MainLayout>
    </QueryClientProvider>
  );
}
