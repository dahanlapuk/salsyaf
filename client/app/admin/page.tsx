'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './admin.module.css'

export default function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (token) {
            router.push('/admin/dashboard')
        }
    }, [router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()

            if (data.success) {
                localStorage.setItem('adminToken', data.token)
                localStorage.setItem('adminUser', JSON.stringify(data.admin))
                router.push('/admin/dashboard')
            } else {
                setError(data.message || 'Login gagal')
            }
        } catch {
            setError('Tidak dapat terhubung ke server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <h1>🕌 Admin PPTQ</h1>
                    <p>Salafiyah Syafi&apos;iyah Proto</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    {error && <div className={styles.error}>{error}</div>}
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Masukkan username"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={styles.loginButton}
                        disabled={loading}
                    >
                        {loading ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>
            </div>
        </div>
    )
}
