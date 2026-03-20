-- Supabase Schema for UPAI.SPACE

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'student',
  plan TEXT DEFAULT 'free',
  streak_count INTEGER DEFAULT 0,
  last_login DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profile Policies
CREATE POLICY "Public profiles are viewable by everyone." 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." 
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create questions table
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  company TEXT,
  difficulty TEXT,
  solution TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Questions Policies
CREATE POLICY "Questions are viewable by everyone." 
  ON public.questions FOR SELECT USING (true);

CREATE POLICY "Only admins can insert questions." 
  ON public.questions FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Only admins can update questions." 
  ON public.questions FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Only admins can delete questions." 
  ON public.questions FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Create user_progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  question_id UUID REFERENCES public.questions(id),
  status TEXT DEFAULT 'attempted',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress." 
  ON public.user_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress." 
  ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Subscriptions & Coupons
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  plan_name TEXT,
  status TEXT DEFAULT 'active',
  start_date DATE,
  end_date DATE
);

CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE,
  discount_percent INTEGER,
  expiry_date DATE,
  usage_limit INTEGER
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions." 
  ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can do everything on subscriptions." 
  ON public.subscriptions FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Coupons viewable by everyone." 
  ON public.coupons FOR SELECT USING (true);

CREATE POLICY "Admins can do everything on coupons." 
  ON public.coupons FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Create a dedicated Admin-Only table (e.g., for platform settings)
CREATE TABLE IF NOT EXISTS public.platform_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS logic enforcing ADMIN ONLY access
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- Only Admins can view or modify THIS table
CREATE POLICY "Strictly admins can do everything on platform_settings." 
  ON public.platform_settings FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
