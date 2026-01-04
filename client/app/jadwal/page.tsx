'use client'

import { useState, useEffect } from 'react'
import styles from './jadwal.module.css'

interface Schedule {
    _id: string
    title: string
    description: string
    time: string
    type: 'harian' | 'mingguan' | 'bulanan' | 'tahunan'
    day?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function JadwalPage() {
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'harian' | 'mingguan' | 'bulanan'>('harian')

    useEffect(() => {
        fetchSchedules()
    }, [])

    const fetchSchedules = async () => {
        try {
            const res = await fetch(`${API_URL}/api/schedule`)
            if (res.ok) {
                const json = await res.json()
                console.log('DEBUG DATA:', json)
                console.log('DEBUG DATA.TYPE:', typeof json?.data, Array.isArray(json?.data))
                const schedulesArray = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : [])
                setSchedules(schedulesArray)
            }
        } catch (error) {
            console.error('Error fetching schedules:', error)
        } finally {
            setLoading(false)
        }
    }

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
                            className={`${styles.tab} ${activeTab === 'harian' ? styles.active : ''}`}
                            onClick={() => setActiveTab('harian')}
                        >
                            📅 Harian
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'mingguan' ? styles.active : ''}`}
                            onClick={() => setActiveTab('mingguan')}
                        >
                            📆 Mingguan
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'bulanan' ? styles.active : ''}`}
                            onClick={() => setActiveTab('bulanan')}
                        >
                            🗓️ Bulanan
                        </button>
                    </div>

                    {/* Schedule List */}
                    <div className={styles.scheduleList}>
                        {filteredSchedules.map((schedule) => (
                            <div key={schedule._id} className={`card ${styles.scheduleItem}`}>
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
