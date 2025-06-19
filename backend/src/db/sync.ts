// src/db/sync.ts
import sequelize from './config'; // adjust this path based on your project

export async function syncDatabase(): Promise<void> {
    try {
        await sequelize.sync({ alter: true }); // or { force: true } if needed
        console.log('✅ Database synced successfully.');
    } catch (err) {
        console.error('❌ Failed to sync database:', err);
    }
}
