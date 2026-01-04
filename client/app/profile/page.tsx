import { Metadata } from "next";
import Image from "next/image";
import styles from "./profile.module.css";

export const metadata: Metadata = {
  title: "Profil - PPTQ Salsyaf Proto",
  description:
    "Profil Pondok Pesantren Tahfidzul Quran Proto - Kedungwuni, Pekalongan",
};

// Foto placeholder sementara - gunakan foto Kyai Basith
const tempPhoto = "/images/kh-abdul-basith.jpg";

export default function ProfilePage() {
  // Data gedung santri putra (4 gedung)
  const gedungPutra = [
    { nama: "Gedung Pusat Putra", tipe: "pusat", penanggungJawab: "Di bawah asuhan langsung Pengasuh" },
    { nama: "Gedung Perumahan (SS Al-Musyafa)", tipe: "cabang", penanggungJawab: "Ahmad Mustafid" },
    { nama: "Gedung Salafiyah Syafi'iyah Salakan", tipe: "cabang", penanggungJawab: "Ulil Albab" },
    { nama: "Gedung Salafiyah Syafi'iyah 3", tipe: "cabang", penanggungJawab: "Gus Hasan" },
  ];

  // Data gedung santri putri (8 gedung)
  const gedungPutri = [
    { nama: "Gedung Pusat Putri", tipe: "pusat", penanggungJawab: "Di bawah asuhan langsung Pengasuh" },
    { nama: "Gedung SS Salakan", tipe: "cabang", penanggungJawab: "Ulil Albab" },
    { nama: "Gedung SS Ndalem", tipe: "cabang", penanggungJawab: "Nyai Hj. Uswatun Khasanah" },
    { nama: "Gedung SS 2", tipe: "cabang", penanggungJawab: "Ust. Abdurrazaq" },
    { nama: "Gedung SS 3", tipe: "cabang", penanggungJawab: "Gus Hasan" },
    { nama: "Gedung SS 4", tipe: "cabang", penanggungJawab: "Gus Balighuddin" },
    { nama: "Gedung SS 5", tipe: "cabang", penanggungJawab: "Bu Hanim" },
    { nama: "Gedung SS 6", tipe: "cabang", penanggungJawab: "Belum ditentukan" },
  ];

  return (
    <div className={styles.profilePage}>
      {/* Header */}
      <section className={styles.header}>
        <div className="container text-center">
          <h1>Profil Pondok Pesantren</h1>
          <p>Mengenal lebih dekat Pondok Pesantren Tahfidzul Quran Proto</p>
        </div>
      </section>

      {/* Sejarah Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">Sejarah Pendirian</h2>
          <div className={styles.sejarahSection}>
            <div className={styles.pendiriGrid}>
              <div className={styles.pendiriCard}>
                <div className={styles.pendiriPhoto}>
                  <Image
                    src={tempPhoto}
                    alt="Almaghfurlah Mbah KH. Syarif Da'un"
                    width={180}
                    height={180}
                    className={styles.pendiriImage}
                  />
                </div>
                <h4>Almaghfurlah</h4>
                <p className={styles.pendiriName}>Mbah KH. Syarif Da&apos;un</p>
                <span className={styles.pendiriRole}>Pendiri</span>
              </div>
              <div className={styles.pendiriCard}>
                <div className={styles.pendiriPhoto}>
                  <Image
                    src={tempPhoto}
                    alt="Almaghfurlahah Mbah Nyai Hj. Maslahah"
                    width={180}
                    height={180}
                    className={styles.pendiriImage}
                  />
                </div>
                <h4>Almaghfurlahah</h4>
                <p className={styles.pendiriName}>Mbah Nyai Hj. Maslahah</p>
                <span className={styles.pendiriRole}>Pendiri</span>
              </div>
            </div>
            <div className={styles.sejarahContent}>
              <div className={styles.sejarahText}>
                <p>
                  Pondok Pesantren Salafiyah Syafi&apos;iyah Proto didirikan
                  pada tahun <strong>1945</strong> oleh pasangan ulama yang
                  mulia, <strong>Almaghfurlah Mbah KH. Syarif Da&apos;un</strong>{" "}
                  dan istrinya{" "}
                  <strong>Almaghfurlahah Mbah Nyai Hj. Maslahah</strong>.
                </p>
                <p>
                  Berawal dari sebuah langgar kecil untuk mengajarkan
                  Al-Qur&apos;an kepada masyarakat sekitar, pesantren ini terus
                  berkembang hingga menjadi salah satu pusat pendidikan Islam
                  yang dipercaya oleh masyarakat luas. Dengan berbekal semangat
                  dakwah dan cita-cita luhur untuk mencetak generasi Qur&apos;ani,
                  beliau berdua telah meletakkan pondasi yang kokoh bagi
                  perkembangan pesantren ini.
                </p>
                <p>
                  Kini, setelah lebih dari tujuh dekade mengabdi untuk umat,
                  Pondok Pesantren Tahfidzul Quran Proto terus melanjutkan
                  estafet perjuangan para pendiri dalam membina dan mendidik
                  generasi penghafal Al-Qur&apos;an yang berakhlak mulia.
                </p>
              </div>
              <div className={styles.sejarahHighlight}>
                <div className={styles.yearBadge}>1945</div>
                <span>Tahun Berdiri</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section section-alt">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <h2>Tentang Kami</h2>
              <p>
                Pondok Pesantren Tahfidzul Quran Proto adalah lembaga pendidikan
                Islam yang berlokasi di Desa Proto, Kedungwuni, Pekalongan.
                Fokus utama kami adalah membina santri untuk menjadi penghafal
                Al-Qur&apos;an yang tidak hanya hafal secara lafadz, tetapi juga
                memahami makna dan mengamalkannya dalam kehidupan sehari-hari.
              </p>
              <p>
                Dengan mengusung metode pembelajaran tahfidz yang telah teruji
                dan lingkungan pesantren yang kondusif, kami berkomitmen
                mencetak generasi Qur&apos;ani yang siap menjadi penerus perjuangan
                dakwah Islam dan bermanfaat bagi masyarakat luas.
              </p>
            </div>
            <div className={styles.statsGrid}>
              <div className="card text-center">
                <div className={styles.statNumber}>12</div>
                <div className={styles.statLabel}>Gedung Pesantren</div>
              </div>
              <div className="card text-center">
                <div className={styles.statNumber}>4</div>
                <div className={styles.statLabel}>Lembaga Pendidikan</div>
              </div>
              <div className="card text-center">
                <div className={styles.statNumber}>79+</div>
                <div className={styles.statLabel}>Tahun Mengabdi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yayasan Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">Yayasan</h2>
          <div className={styles.yayasanCard}>
            <div className={styles.yayasanHeader}>
              <div className={styles.yayasanIcon}>🏛️</div>
              <div>
                <h3>Yayasan Salafiyah Syafi&apos;iyah Proto</h3>
                <p>Pusat Pendidikan Islam Berbasis Pesantren</p>
              </div>
            </div>
            <p className={styles.yayasanDesc}>
              Seluruh kegiatan pendidikan di pesantren kami bernaung di bawah 
              <strong> Yayasan Salafiyah Syafi&apos;iyah Proto</strong>. 
              Yayasan ini didirikan dengan visi membangun generasi Islam yang 
              beriman, berilmu, dan berakhlak mulia. Saat ini, yayasan mengelola 
              empat lembaga pendidikan yang saling terintegrasi, mulai dari 
              jenjang Madrasah Ibtidaiyah hingga Pondok Pesantren Tahfidzul Quran.
            </p>
            <h4 className={styles.lembagaTitle}>Lembaga di Bawah Naungan Yayasan</h4>
            <div className={styles.lembagaGrid}>
              <div className={styles.lembagaItem}>
                <span className={styles.lembagaIcon}>🎒</span>
                <div>
                  <span>Madrasah Ibtidaiyah (MI)</span>
                  <small className={styles.lembagaAlias}>Pendidikan Dasar Islam (Kelas 1-6)</small>
                </div>
              </div>
              <div className={styles.lembagaItem}>
                <span className={styles.lembagaIcon}>📚</span>
                <div>
                  <span>Madrasah Tsanawiyah (MTs)</span>
                  <small className={styles.lembagaAlias}>Pendidikan Menengah Pertama Islam</small>
                </div>
              </div>
              <div className={styles.lembagaItem}>
                <span className={styles.lembagaIcon}>🎓</span>
                <div>
                  <span>Madrasah Aliyah (MA)</span>
                  <small className={styles.lembagaAlias}>Pendidikan Menengah Atas Islam</small>
                </div>
              </div>
              <div className={styles.lembagaItem}>
                <span className={styles.lembagaIcon}>📖</span>
                <div>
                  <span>PPTQ Salsyaf Proto</span>
                  <small className={styles.lembagaAlias}>Pondok Pesantren Tahfidzul Quran</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pengasuh Section */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">Pengasuh Pondok Pesantren</h2>

          <div className={styles.pengasuhSection}>
            <div className={styles.pengasuhCard}>
              <div className={styles.pengasuhPhoto}>
                <Image
                  src={tempPhoto}
                  alt="KH. Abdul Basith Syarif"
                  width={200}
                  height={200}
                  className={styles.pengasuhImage}
                />
              </div>
              <div className={styles.pengasuhInfo}>
                <span className={styles.pengasuhTitle}>
                  Pengasuh Pondok Pesantren
                </span>
                <h3 className={styles.pengasuhName}>KH. Abdul Basith Syarif</h3>
                <p className={styles.pengasuhDesc}>
                  Memimpin dan mengasuh seluruh kegiatan pesantren baik santri
                  putra maupun putri. Beliau merupakan putra dari pendiri
                  pesantren yang melanjutkan estafet perjuangan dalam mendidik
                  generasi Qur&apos;ani.
                </p>
              </div>
            </div>
          </div>

          {/* Lurah Santri */}
          <div className={styles.lurahSection}>
            <h3 className="text-center mb-md">Lurah Santri</h3>
            <div className="grid grid-2">
              <div className={styles.lurahCard}>
                <div className={styles.lurahPhoto}>
                  <Image
                    src={tempPhoto}
                    alt="Roqiful Ma'ani - Lurah Santri Putra"
                    width={150}
                    height={150}
                    className={styles.lurahImage}
                  />
                </div>
                <div className={styles.lurahInfo}>
                  <span className={styles.lurahTitle}>Lurah Santri Putra</span>
                  <p className={styles.lurahName}>Roqiful Ma&apos;ani</p>
                  <p className={styles.lurahDesc}>
                    Bertanggung jawab mengkoordinasikan seluruh kegiatan
                    kesantrian di asrama putra.
                  </p>
                </div>
              </div>
              <div className={styles.lurahCard}>
                <div className={styles.lurahPhoto}>
                  <Image
                    src={tempPhoto}
                    alt="Iqlimatun - Lurah Santri Putri"
                    width={150}
                    height={150}
                    className={styles.lurahImage}
                  />
                </div>
                <div className={styles.lurahInfo}>
                  <span className={styles.lurahTitle}>Lurah Santri Putri</span>
                  <p className={styles.lurahName}>Iqlimatun</p>
                  <p className={styles.lurahDesc}>
                    Bertanggung jawab mengkoordinasikan seluruh kegiatan
                    kesantrian di asrama putri.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur Gedung Pesantren */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">Gedung & Asrama Pesantren</h2>
          <p
            className="text-center mb-lg"
            style={{
              color: "var(--color-text-light)",
              maxWidth: "700px",
              margin: "0 auto 2rem",
            }}
          >
            Pesantren kami memiliki 12 gedung yang tersebar di beberapa lokasi,
            dengan masing-masing gedung memiliki penanggung jawab yang mengawasi
            kegiatan harian para santri.
          </p>

          {/* Pesantren Putra */}
          <div className={styles.gedungSection}>
            <div className={styles.gedungSectionHeader}>
              <span className={styles.gedungSectionIcon}>👨</span>
              <div>
                <h3>Asrama Santri Putra</h3>
                <p>4 gedung dengan kapasitas ratusan santri</p>
              </div>
            </div>
            <div className={styles.gedungGrid}>
              {gedungPutra.map((gedung, index) => (
                <div key={index} className={styles.gedungCard}>
                  <div className={styles.gedungPhoto}>
                    <Image
                      src={tempPhoto}
                      alt={`Gedung ${gedung.nama}`}
                      width={300}
                      height={200}
                      className={styles.gedungImage}
                    />
                    <div
                      className={
                        gedung.tipe === "pusat"
                          ? styles.gedungTypeBadge
                          : styles.gedungTypeBadgeCabang
                      }
                    >
                      {gedung.tipe === "pusat" ? "Pusat" : "Cabang"}
                    </div>
                  </div>
                  <div className={styles.gedungCardContent}>
                    <h4>{gedung.nama}</h4>
                    <p className={styles.gedungPenanggungJawab}>
                      <strong>Penanggung Jawab:</strong> {gedung.penanggungJawab}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pesantren Putri */}
          <div className={styles.gedungSection}>
            <div className={styles.gedungSectionHeader}>
              <span className={styles.gedungSectionIcon}>👩</span>
              <div>
                <h3>Asrama Santri Putri</h3>
                <p>8 gedung dengan kapasitas ratusan santriwati</p>
              </div>
            </div>
            <div className={styles.gedungGrid}>
              {gedungPutri.map((gedung, index) => (
                <div key={index} className={styles.gedungCard}>
                  <div className={styles.gedungPhoto}>
                    <Image
                      src={tempPhoto}
                      alt={`Gedung ${gedung.nama}`}
                      width={300}
                      height={200}
                      className={styles.gedungImage}
                    />
                    <div
                      className={
                        gedung.tipe === "pusat"
                          ? styles.gedungTypeBadge
                          : styles.gedungTypeBadgeCabang
                      }
                    >
                      {gedung.tipe === "pusat" ? "Pusat" : "Cabang"}
                    </div>
                  </div>
                  <div className={styles.gedungCardContent}>
                    <h4>{gedung.nama}</h4>
                    <p className={styles.gedungPenanggungJawab}>
                      <strong>Penanggung Jawab:</strong> {gedung.penanggungJawab}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Gedung Info */}
          <div className={styles.totalGedung}>
            <div className={styles.totalItem}>
              <span className={styles.totalNumber}>12</span>
              <span className={styles.totalLabel}>Total Gedung</span>
            </div>
            <div className={styles.totalItem}>
              <span className={styles.totalNumber}>4</span>
              <span className={styles.totalLabel}>Gedung Putra</span>
            </div>
            <div className={styles.totalItem}>
              <span className={styles.totalNumber}>8</span>
              <span className={styles.totalLabel}>Gedung Putri</span>
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
                Menjadi lembaga pendidikan Islam terdepan dalam mencetak
                generasi Qur&apos;ani yang hafal Al-Qur&apos;an, berakhlak mulia, dan
                bermanfaat bagi umat.
              </p>
            </div>
            <div className="card">
              <h3>🚀 Misi</h3>
              <ul className={styles.missionList}>
                <li>
                  Menyelenggarakan pendidikan tahfidz Al-Qur&apos;an dengan metode
                  yang efektif
                </li>
                <li>
                  Membentuk karakter Islami melalui pembiasaan dan keteladanan
                </li>
                <li>
                  Mengajarkan ilmu agama dengan manhaj salafiyah syafi&apos;iyah
                </li>
                <li>
                  Membekali santri dengan keterampilan hidup yang bermanfaat
                </li>
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
              <h4>Tahfidz Al-Qur&apos;an</h4>
              <p>
                Program hafalan Al-Qur&apos;an 30 juz dengan metode talaqqi dan
                muraja&apos;ah intensif
              </p>
            </div>
            <div className="card text-center">
              <div className={styles.programIcon}>📚</div>
              <h4>Kitab Kuning</h4>
              <p>
                Pembelajaran kitab-kitab klasik dalam berbagai disiplin ilmu
                agama
              </p>
            </div>
            <div className="card text-center">
              <div className={styles.programIcon}>🕌</div>
              <h4>Pembinaan Akhlak</h4>
              <p>
                Pembentukan karakter Islami melalui pembiasaan ibadah dan akhlak
                terpuji
              </p>
            </div>
            <div className="card text-center">
              <div className={styles.programIcon}>🎓</div>
              <h4>Pendidikan Formal</h4>
              <p>
                Integrasi dengan pendidikan formal untuk masa depan yang cerah
              </p>
            </div>
            <div className="card text-center">
              <div className={styles.programIcon}>💻</div>
              <h4>Keterampilan</h4>
              <p>Pelatihan keterampilan praktis untuk bekal kehidupan</p>
            </div>
            <div className="card text-center">
              <div className={styles.programIcon}>🌍</div>
              <h4>Bahasa Arab & Inggris</h4>
              <p>
                Pembelajaran bahasa Arab dan Inggris untuk komunikasi global
              </p>
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
                <strong>Jl. Ponpes Al-quran Gang 2</strong>
                <br />
                Proto Karangasem, Kedungwuni
                <br />
                Pekalongan 51173
                <br />
                Jawa Tengah, Indonesia
              </p>
              <div className={styles.locationMeta}>
                <div>
                  <strong>Email:</strong> ponpesproto22@gmail.com
                </div>
                <div>
                  <strong>WhatsApp Santri Putra:</strong> +62 857-0012-8153
                  (Ridho Rizaldi)
                </div>
              </div>
            </div>
            <div className={styles.mapPlaceholder}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.37057360102!2d109.66447751184653!3d-6.965536693005945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70237688f2843d%3A0x9daa0964c6d138b1!2sPondok%20Pesantren%20Salafiyah%20Syafi&#39;iyah%20Proto!5e0!3m2!1sid!2sid!4v1767355649590!5m2!1sid!2sid"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "var(--radius-md)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
