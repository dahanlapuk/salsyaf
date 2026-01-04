import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

// Admin Schema (inline untuk script)
const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' }
}, { timestamps: true })

const Admin = mongoose.model('Admin', AdminSchema)

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pptq-db'

async function seedAdmin() {
    try {
        console.log('🔄 Menghubungkan ke MongoDB...')
        await mongoose.connect(MONGODB_URI)
        console.log('✅ Terhubung ke MongoDB')

        // Cek apakah admin sudah ada
        const existingAdmin = await Admin.findOne({ username: 'admin' })
        
        if (existingAdmin) {
            console.log('ℹ️  Admin sudah ada di database')
            console.log('   Username: admin')
            console.log('   Role:', existingAdmin.role)
        } else {
            // Hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash('admin123', salt)

            // Buat admin baru
            const admin = new Admin({
                username: 'admin',
                password: hashedPassword,
                role: 'superadmin'
            })

            await admin.save()
            console.log('✅ Admin berhasil dibuat!')
            console.log('   Username: admin')
            console.log('   Password: admin123')
            console.log('   Role: superadmin')
            console.log('')
            console.log('⚠️  PENTING: Segera ganti password setelah login!')
        }

        await mongoose.disconnect()
        console.log('\n✅ Selesai!')
        process.exit(0)
    } catch (error) {
        console.error('❌ Error:', error)
        process.exit(1)
    }
}

seedAdmin()
