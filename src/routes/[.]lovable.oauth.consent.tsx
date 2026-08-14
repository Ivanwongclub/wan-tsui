import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

type OAuthDetails = {
  client?: { name?: string | null } | null;
  redirect_url?: string | null;
  redirect_to?: string | null;
};

type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: OAuthDetails | null; error: Error | null }>;
  approveAuthorization: (id: string) => Promise<{ data: OAuthDetails | null; error: Error | null }>;
  denyAuthorization: (id: string) => Promise<{ data: OAuthDetails | null; error: Error | null }>;
};

const oauthApi = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export const Route = createFileRoute('/.lovable/oauth/consent')({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === 'string' ? s.authorization_id : '',
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error('Missing authorization_id');
    const { data } = await supabase.auth.getSession();
    const next = location.pathname + location.searchStr;
    if (!data.session) throw redirect({ to: '/admin/login', search: { next } });
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get('authorization_id')!;
    const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
    if (error) throw error;
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main style={{ padding: 32, fontFamily: 'system-ui' }}>
      Could not load this authorization request: {String((error as Error)?.message ?? error)}
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? 'an app';

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const api = oauthApi();
    const { data, error } = approve
      ? await api.approveAuthorization(authorization_id)
      : await api.denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError('No redirect returned by the authorization server.');
      return;
    }
    window.location.href = target;
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F5F5F5',
        fontFamily: 'system-ui, sans-serif',
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: '100%',
          background: '#fff',
          borderRadius: 12,
          padding: 28,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        }}
      >
        <h1 style={{ fontSize: 20, marginTop: 0, color: '#0F766E' }}>
          Connect {clientName} to your account
        </h1>
        <p style={{ color: '#444', lineHeight: 1.6 }}>
          This lets {clientName} read and edit the Wan Tsui website content as you.
        </p>
        {error && (
          <p role="alert" style={{ color: '#B91C1C' }}>
            {error}
          </p>
        )}
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button
            disabled={busy}
            onClick={() => decide(true)}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: '#0F766E',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            Approve
          </button>
          <button
            disabled={busy}
            onClick={() => decide(false)}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: '#fff',
              color: '#444',
              border: '1px solid #D4D4D4',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            Deny
          </button>
        </div>
      </div>
    </main>
  );
}
