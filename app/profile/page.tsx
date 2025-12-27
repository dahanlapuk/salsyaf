import { Metadata } from 'next'
import styles from './profile.module.css'

export const metadata: Metadata = {
    title: 'Profil - PPTQ Salafiyah Syafi\'iyah',
    description: 'Profil Pondok Pesantren Tahfidzul Quran Salafiyah Syafi\'iyah Pekalongan',
}

export default function ProfilePage() {
    return (
        <div className={styles.profilePage}>
            {/* Header */}
            <section className={styles.header}>
                <div className="container text-center">
                    <h1>Profil Pondok Pesantren</h1>
                    <p>Mengenal lebih dekat Pondok Pesantren Tahfidzul Quran Salafiyah Syafi'iyah</p>
                </div>
            </section>

            {/* About Section */}
            <section className="section">
                <div className="container">
                    <div className={styles.aboutGrid}>
                        <div className={styles.aboutContent}>
                            <h2>Tentang Kami</h2>
                            <p>
                                Pondok Pesantren Tahfidzul Quran Salafiyah Syafi'iyah adalah lembaga pendidikan Islam
                                yang berlokasi di Kedungwuni, Pekalongan. Kami berfokus pada pembentukan generasi
                                Qur'ani yang hafal Al-Qur'an dan berakhlak mulia.
                            </p>
                            <p>
                                Dengan metode pembelajaran yang terbukti efektif dan lingkungan yang kondusif,
                                kami berkomitmen untuk mencetak para penghafal Al-Qur'an yang tidak hanya hafal,
                                tetapi juga memahami dan mengamalkan isi kandungan Al-Qur'an dalam kehidupan sehari-hari.
                            </p>
                        </div>
                        <div className={styles.statsGrid}>
                            <div className="card text-center">
                                <div className={styles.statNumber}>90+</div>
                                <div className={styles.statLabel}>Kiriman Instagram</div>
                            </div>
                            <div className="card text-center">
                                <div className={styles.statNumber}>2,918</div>
                                <div className={styles.statLabel}>Pengikut</div>
                            </div>
                            <div className="card text-center">
                                <div className={styles.statNumber}>100+</div>
                                <div className={styles.statLabel}>Diikuti</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Mission */}
            <section className="section section-alt">
                <div className="container">
                    <div className="grid grid-2">
                        <div className="card">
                            <h3>🎯 Visi</h3>
                            <p>
                                Menjadi lembaga pendidikan Islam terdepan dalam mencetak generasi Qur'ani yang
                                hafal Al-Qur'an, berakhlak mulia, dan bermanfaat bagi umat.
                            </p>
                        </div>
                        <div className="card">
                            <h3>🚀 Misi</h3>
                            <ul className={styles.missionList}>
                                <li>Menyelenggarakan pendidikan tahfidz Al-Qur'an dengan metode yang efektif</li>
                                <li>Membentuk karakter Islami melalui pembiasaan dan keteladanan</li>
                                <li>Mengajarkan ilmu agama dengan manhaj salafiyah syafi'iyah</li>
                                <li>Membekali santri dengan keterampilan hidup yang bermanfaat</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs */}
            <section className="section">
                <div className="container">
                    <h2 className="text-center mb-lg">Program Unggulan</h2>
                    <div className="grid grid-3">
                        <div className="card text-center">
                            <div className={styles.programIcon}>📖</div>
                            <h4>Tahfidz Al-Qur'an</h4>
                            <p>Program hafalan Al-Qur'an 30 juz dengan metode talaqqi dan muraja'ah intensif</p>
                        </div>
                        <div className="card text-center">
                            <div className={styles.programIcon}>📚</div>
                            <h4>Kitab Kuning</h4>
                            <p>Pembelajaran kitab-kitab klasik dalam berbagai disiplin ilmu agama</p>
                        </div>
                        <div className="card text-center">
                            <div className={styles.programIcon}>🕌</div>
                            <h4>Pembinaan Akhlak</h4>
                            <p>Pembentukan karakter Islami melalui pembiasaan ibadah dan akhlak terpuji</p>
                        </div>
                        <div className="card text-center">
                            <div className={styles.programIcon}>🎓</div>
                            <h4>Pendidikan Formal</h4>
                            <p>Integrasi dengan pendidikan formal untuk masa depan yang cerah</p>
                        </div>
                        <div className="card text-center">
                            <div className={styles.programIcon}>💻</div>
                            <h4>Keterampilan</h4>
                            <p>Pelatihan keterampilan praktis untuk bekal kehidupan</p>
                        </div>
                        <div className="card text-center">
                            <div className={styles.programIcon}>🌍</div>
                            <h4>Bahasa Arab & Inggris</h4>
                            <p>Pembelajaran bahasa Arab dan Inggris untuk komunikasi global</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location */}
            <section className="section section-alt">
                <div className="container">
                    <h2 className="text-center mb-lg">Lokasi Kami</h2>
                    <div className={styles.locationCard}>
                        <div className={styles.locationInfo}>
                            <h3>Alamat Lengkap</h3>
                            <p>
                                <strong>Jl. Ponpes Al-quran Gang 2</strong><br />
                                Proto Karangasem, Kedungwuni<br />
                                Pekalongan 51173<br />
                                Jawa Tengah, Indonesia
                            </p>
                            <div className={styles.locationMeta}>
                                <div>
                                    <strong>Email:</strong> ponpes_salsyaf@example.com
                                </div>
                                <div>
                                    <strong>Telepon:</strong> +62 xxx xxxx xxxx
                                </div>
                            </div>
                        </div>
                        <div className={styles.mapPlaceholder}>
                            <div className={styles.mapIcon}>🗺️</div>
                            <p>Peta Lokasi</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
