-- Add admin role to barbers table
ALTER TABLE barbers ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Create admin RLS policies
CREATE POLICY "Admins can view all barbers" ON barbers
  FOR SELECT USING (
    (SELECT is_admin FROM barbers WHERE user_id = auth.uid()) = true
  );

CREATE POLICY "Admins can update barber subscriptions" ON barbers
  FOR UPDATE USING (
    (SELECT is_admin FROM barbers WHERE user_id = auth.uid()) = true
  );

-- Create index for admin queries
CREATE INDEX IF NOT EXISTS idx_barbers_is_admin ON barbers(is_admin);
