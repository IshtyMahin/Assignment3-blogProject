import { User } from './modules/auth/auth.model';
import { generateAdminId } from './modules/auth/auth.utils';

const createDefaultAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const generatedId = await generateAdminId();

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const admin = new User({
      id: generatedId,
      name: 'Default Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('Default admin created:', adminEmail);
  } else {
    console.log('Admin user already exists.');
  }
};

export default createDefaultAdmin;
