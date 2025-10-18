-- Create tables for TrimSlotr appointment scheduler

-- Barbers/Stylists table
CREATE TABLE IF NOT EXISTS barbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  bio TEXT,
  profile_image_url VARCHAR(500),
  address VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  subscription_tier VARCHAR(50) DEFAULT 'free', -- free, basic, pro, premium
  subscription_status VARCHAR(50) DEFAULT 'active', -- active, cancelled, expired
  subscription_end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  barber_id UUID NOT NULL REFERENCES barbers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  price DECIMAL(10, 2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Working hours table
CREATE TABLE IF NOT EXISTS working_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  barber_id UUID NOT NULL REFERENCES barbers(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL, -- 0 = Sunday, 6 = Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_open BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(barber_id, day_of_week)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  barber_id UUID NOT NULL REFERENCES barbers(id) ON DELETE CASCADE,
  client_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20),
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'confirmed', -- confirmed, completed, cancelled, no-show
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Clients table (for repeat customers)
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  profile_image_url VARCHAR(500),
  total_bookings INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  barber_id UUID NOT NULL REFERENCES barbers(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_barbers_user_id ON barbers(user_id);
CREATE INDEX IF NOT EXISTS idx_services_barber_id ON services(barber_id);
CREATE INDEX IF NOT EXISTS idx_working_hours_barber_id ON working_hours(barber_id);
CREATE INDEX IF NOT EXISTS idx_bookings_barber_id ON bookings(barber_id);
CREATE INDEX IF NOT EXISTS idx_bookings_client_id ON bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_barber_id ON reviews(barber_id);

-- Enable Row Level Security
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE working_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for barbers table
CREATE POLICY "Barbers can view their own profile" ON barbers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public barber profiles" ON barbers
  FOR SELECT USING (true);

CREATE POLICY "Barbers can update their own profile" ON barbers
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for services table
CREATE POLICY "Anyone can view services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Barbers can manage their own services" ON services
  FOR ALL USING (barber_id IN (SELECT id FROM barbers WHERE user_id = auth.uid()));

-- RLS Policies for working_hours table
CREATE POLICY "Anyone can view working hours" ON working_hours
  FOR SELECT USING (true);

CREATE POLICY "Barbers can manage their own working hours" ON working_hours
  FOR ALL USING (barber_id IN (SELECT id FROM barbers WHERE user_id = auth.uid()));

-- RLS Policies for bookings table
CREATE POLICY "Barbers can view their own bookings" ON bookings
  FOR SELECT USING (barber_id IN (SELECT id FROM barbers WHERE user_id = auth.uid()));

CREATE POLICY "Clients can view their own bookings" ON bookings
  FOR SELECT USING (client_id = auth.uid());

CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Barbers can update their bookings" ON bookings
  FOR UPDATE USING (barber_id IN (SELECT id FROM barbers WHERE user_id = auth.uid()));

-- RLS Policies for clients table
CREATE POLICY "Clients can view their own profile" ON clients
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Clients can update their own profile" ON clients
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Clients can insert their own profile" ON clients
  FOR INSERT WITH CHECK (auth.uid() = user_id);
