'use client'

import { useState, useEffect } from 'react'
import styles from './jadwal.module.css'

interface Schedule {
    id: string
    title: string
    description: string
    time: string
    type: 'daily' | 'weekly' | 'monthly'
    day?: string
}

export default function JadwalPage() {
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily')

    useEffect(() => {
        // Simulate fetching schedules
        setTimeout(() => {
            setSchedules([
                // Daily
                { id: '1', title: 'Sholat Subuh Berjamaah', description: 'Sholat subuh berjamaah di masjid', time: '04:30', type: 'daily' },
                { id: '2', title: 'Setoran Hafalan', description: 'Setoran hafalan kepada ustadz', time: '05:30 - 07:00', type: 'daily' },
                { id: '3', title: 'Sarapan', description: 'Waktu sarapan santri', time: '07:00 - 07:30', type: 'daily' },
                { id: '4', title: 'Kajian Kitab Kuning', description: 'Pembelajaran kitab kuning', time: '08:00 - 10:00', type: 'daily' },
                { id: '5', title: 'Muraja\'ah', description: 'Muraja\'ah hafalan', time: '10:00 - 12:00', type: 'daily' },
                { id: '6', title: 'Sholat Dzuhur & Makan Siang', description: '', time: '12:00 - 13:00', type: 'daily' },
                { id: '7', title: 'Istirahat', description: 'Waktu istirahat siang', time: '13:00 - 14:30', type: 'daily' },
                { id: '8', title: 'Sholat Ashar', description: 'Sholat ashar berjamaah', time: '15:30', type: 'daily' },
                { id: '9', title: 'Setoran Hafalan Sore', description: 'Setoran hafalan sore', time: '16:00 - 17:30', type: 'daily' },
                { id: '10', title: 'Sholat Maghrib', description: 'Sholat maghrib berjamaah', time: '18:00', type: 'daily' },
                { id: '11', title: 'Makan Malam', description: 'Waktu makan malam', time: '18:30 - 19:00', type: 'daily' },
                { id: '12', title: 'Sholat Isya', description: 'Sholat isya berjamaah', time: '19:30', type: 'daily' },
                { id: '13', title: 'Kajian Malam', description: 'Kajian kitab atau tausiyah', time: '20:00 - 21:00', type: 'daily' },
                { id: '14', title: 'Istirahat Malam', description: 'Waktu istirahat malam', time: '21:30', type: 'daily' },

                // Weekly
                { id: '15', title: 'Bersih-bersih Pondok', description: 'Kerja bakti membersihkan pondok', time: '08:00', type: 'weekly', day: 'Jumat' },
                { id: '16', title: 'Olahraga', description: 'Kegiatan olahraga bersama', time: '16:00', type: 'weekly', day: 'Sabtu' },
                { id: '17', title: 'Khataman Al-Qur\'an', description: 'Khataman Al-Qur\'an bersama', time: '08:00', type: 'weekly', day: 'Minggu' },

                // Monthly
                { id: '18', title: 'Evaluasi Hafalan', description: 'Evaluasi hafalan bulanan', time: 'Minggu pertama', type: 'monthly' },
                { id: '19', title: 'Pertemuan Wali Santri', description: 'Pertemuan dengan wali santri', time: 'Minggu kedua', type: 'monthly' },
            ])
            setLoading(false)
        }, 500)
    }, [])

    const filteredSchedules = schedules.filter(s => s.type === activeTab)

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className="spinner"></div>
                <p>Memuat jadwal...</p>
            </div>
        )
    }

    return (
        <div className={styles.jadwalPage}>
            {/* Header */}
            <section className={styles.header}>
                <div className="container text-center">
                    <h1>Jadwal Kegiatan</h1>
                    <p>Jadwal kegiatan harian, mingguan, dan bulanan pondok pesantren</p>
                </div>
            </section>

            {/* Schedule Content */}
            <section className="section">
                <div className="container">
                    {/* Tabs */}
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === 'daily' ? styles.active : ''}`}
                            onClick={() => setActiveTab('daily')}
                        >
                            📅 Harian
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'weekly' ? styles.active : ''}`}
                            onClick={() => setActiveTab('weekly')}
                        >
                            📆 Mingguan
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'monthly' ? styles.active : ''}`}
                            onClick={() => setActiveTab('monthly')}
                        >
                            🗓️ Bulanan
                        </button>
                    </div>

                    {/* Schedule List */}
                    <div className={styles.scheduleList}>
                        {filteredSchedules.map((schedule) => (
                            <div key={schedule.id} className={`card ${styles.scheduleItem}`}>
                                <div className={styles.scheduleTime}>
                                    <div className={styles.timeIcon}>🕐</div>
                                    <div className={styles.timeText}>{schedule.time}</div>
                                    {schedule.day && <div className={styles.dayBadge}>{schedule.day}</div>}
                                </div>
                                <div className={styles.scheduleContent}>
                                    <h3>{schedule.title}</h3>
                                    {schedule.description && <p>{schedule.description}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
