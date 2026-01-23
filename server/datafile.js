const mongoose = require('mongoose');
const User = require('./models/User'); // adjust path if needed
const dotenv = require('dotenv');

dotenv.config();
const seedAdminUser = async () => {
    const mongouri = "Add your monodb url here";

    try {
        await mongoose.connect(mongouri);

        console.log('MongoDB connected');

        // Check if admin already exists
        const adminExists = await User.findOne({ role: 'admin' });

        if (adminExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const adminUser = new User({
            name: 'admin',
            email: 'admin@example.com',
            password: 'admin123', // will be hashed automatically
            role: 'admin'
        });

        await adminUser.save();

        console.log('Admin user created successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding admin user:', error);
        process.exit(1);
    }
};

seedAdminUser();
