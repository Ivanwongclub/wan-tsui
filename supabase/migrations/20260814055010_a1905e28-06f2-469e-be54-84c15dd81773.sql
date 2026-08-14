CREATE TABLE IF NOT EXISTS public.chat_threads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '新對話',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id UUID NOT NULL REFERENCES public.chat_threads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  role TEXT NOT NULL,
  parts JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS chat_threads_user_idx ON public.chat_threads (user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS chat_messages_thread_idx ON public.chat_messages (thread_id, created_at);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_threads TO authenticated;
GRANT ALL ON public.chat_threads TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_messages TO authenticated;
GRANT ALL ON public.chat_messages TO service_role;

ALTER TABLE public.chat_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage their own threads" ON public.chat_threads;
CREATE POLICY "Admins manage their own threads" ON public.chat_threads
  FOR ALL TO authenticated
  USING (user_id = auth.uid() AND public.is_wt_admin())
  WITH CHECK (user_id = auth.uid() AND public.is_wt_admin());

DROP POLICY IF EXISTS "Admins manage their own messages" ON public.chat_messages;
CREATE POLICY "Admins manage their own messages" ON public.chat_messages
  FOR ALL TO authenticated
  USING (user_id = auth.uid() AND public.is_wt_admin())
  WITH CHECK (user_id = auth.uid() AND public.is_wt_admin());

CREATE OR REPLACE FUNCTION public.touch_chat_thread_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_chat_threads_updated_at ON public.chat_threads;
CREATE TRIGGER update_chat_threads_updated_at BEFORE UPDATE ON public.chat_threads
  FOR EACH ROW EXECUTE FUNCTION public.touch_chat_thread_updated_at();