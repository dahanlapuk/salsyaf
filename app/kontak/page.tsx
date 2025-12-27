import styles from './kontak.module.css'

export default function KontakPage() {
    return (
        <div className={styles.kontakPage}>
            {/* Header */}
            <section className={styles.header}>
                <div className="container text-center">
                    <h1>Hubungi Kami</h1>
                    <p>Kami siap melayani pertanyaan dan informasi seputar pondok pesantren</p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section">
                <div className="container">
                    <div className={styles.contactGrid}>
                        {/* Contact Info */}
                        <div className={styles.contactInfo}>
                            <h2>Informasi Kontak</h2>
                            <p className="mb-lg">
                                Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan atau
                                ingin mendapatkan informasi lebih lanjut tentang pondok pesantren kami.
                            </p>

                            <div className={styles.infoCards}>
                                <div className="card">
                                    <div className={styles.infoIcon}>📍</div>
                                    <h4>Alamat</h4>
                                    <p>
                                        Jl. Ponpes Al-quran Gang 2<br />
                                        Proto Karangasem, Kedungwuni<br />
                                        Pekalongan 51173<br />
                                        Jawa Tengah, Indonesia
                                    </p>
                                </div>

                                <div className="card">
                                    <div className={styles.infoIcon}>📧</div>
                                    <h4>Email</h4>
                                    <p>ponpes_salsyaf@example.com</p>
                                </div>

                                <div className="card">
                                    <div className={styles.infoIcon}>📱</div>
                                    <h4>Telepon</h4>
                                    <p>+62 xxx xxxx xxxx</p>
                                </div>

                                <div className="card">
                                    <div className={styles.infoIcon}>📷</div>
                                    <h4>Instagram</h4>
                                    <p>@ponpes_salsyaf</p>
                                    <p className={styles.followers}>2,918 pengikut</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className={styles.contactForm}>
                            <div className="card">
                                <h3>Kirim Pesan</h3>
                                <form>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Masukkan nama lengkap"
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="nama@email.com"
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="phone">Nomor Telepon</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="+62 xxx xxxx xxxx"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="subject">Subjek</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            placeholder="Subjek pesan"
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="message">Pesan</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            placeholder="Tulis pesan Anda di sini..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                        Kirim Pesan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
