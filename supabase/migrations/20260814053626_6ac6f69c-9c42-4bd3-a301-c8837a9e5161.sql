INSERT INTO public.admin_users (user_id, email, active)
VALUES ('55eabe27-6d59-487f-8bec-6d1f75745ed5', 'reception@wt-medical.com', true)
ON CONFLICT (user_id) DO UPDATE SET active = true, email = EXCLUDED.email;