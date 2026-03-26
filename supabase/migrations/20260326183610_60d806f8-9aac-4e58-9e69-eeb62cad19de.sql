
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_ref text NOT NULL UNIQUE,
  customer_name text NOT NULL,
  customer_email text,
  customer_phone text NOT NULL,
  delivery_address text,
  delivery_city text DEFAULT 'Nairobi',
  notes text,
  payment_method text NOT NULL DEFAULT 'mpesa',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric NOT NULL DEFAULT 0,
  discount numeric NOT NULL DEFAULT 0,
  shipping numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins full access orders" ON public.orders FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
