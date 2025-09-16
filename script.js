let daftarBuku = [
    { nomorAkses: 1, judul: "Laskar Pelangi", penulis: "Andrea Hirata", penerbit: "Bentang Pustaka", jumlahBuku: 5 },
    { nomorAkses: 2, judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", penerbit: "Hasta Mitra", jumlahBuku: 3 },
    { nomorAkses: 3, judul: "Ayat-Ayat Cinta", penulis: "Habiburrahman El Shirazy", penerbit: "Republika", jumlahBuku: 6 }
];

let nextNomorAkses = 4;

function tampilkanBuku() {
    const content = document.getElementById("content");
    if (daftarBuku.length === 0) {
        content.innerHTML = `
            <h2>📚 Daftar Buku</h2>
            <div class="error-message"><p>Belum ada buku dalam perpustakaan</p></div>
        `;
    } else {
        let totalBuku = daftarBuku.reduce((total, buku) => total + buku.jumlahBuku, 0);
        let tabelBuku = `
            <h2>📚 Daftar Buku Perpustakaan</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No. Akses</th>
                            <th>Judul Buku</th>
                            <th>Penulis</th>
                            <th>Penerbit</th>
                            <th>Jumlah</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        daftarBuku.forEach(buku => {
            tabelBuku += `
                <tr>
                    <td>${buku.nomorAkses}</td>
                    <td>${buku.judul}</td>
                    <td>${buku.penulis}</td>
                    <td>${buku.penerbit}</td>
                    <td>${buku.jumlahBuku}</td>
                </tr>
            `;
        });
        tabelBuku += `
                    </tbody>
                </table>
            </div>
            <div class="total-info">
                📊 Total Buku dalam Perpustakaan: ${totalBuku} eksemplar
            </div>
        `;
        content.innerHTML = tabelBuku;
    }
}

function tambahkanBuku() {
    const content = document.getElementById("content");
    content.innerHTML = `
        <h2>➕ Tambah Buku Baru</h2>
        <div class="form-container">
            <div class="form-group"><label for="judul">📖 Judul Buku:</label><input type="text" id="judul" placeholder="Masukkan judul buku"></div>
            <div class="form-group"><label for="penulis">✍️ Penulis:</label><input type="text" id="penulis" placeholder="Masukkan nama penulis"></div>
            <div class="form-group"><label for="penerbit">🏢 Penerbit:</label><input type="text" id="penerbit" placeholder="Masukkan nama penerbit"></div>
            <div class="form-group"><label for="jumlah">🔢 Jumlah Buku:</label><input type="number" id="jumlah" placeholder="Masukkan jumlah eksemplar" min="1"></div>
            <button class="btn" onclick="simpanBuku()">💾 Simpan Buku</button>
        </div>
    `;
}

function simpanBuku() {
    const judul = document.getElementById("judul").value.trim();
    const penulis = document.getElementById("penulis").value.trim();
    const penerbit = document.getElementById("penerbit").value.trim();
    const jumlahBuku = parseInt(document.getElementById("jumlah").value);
    if (!judul || !penulis || !penerbit) {
        showMessage("❌ Semua field harus diisi!", "error");
        return;
    }
    if (isNaN(jumlahBuku) || jumlahBuku <= 0) {
        showMessage("❌ Jumlah buku harus berupa angka positif!", "error");
        return;
    }
    daftarBuku.push({ nomorAkses: nextNomorAkses, judul, penulis, penerbit, jumlahBuku });
    nextNomorAkses++;
    showMessage(`✅ Buku "${judul}" berhasil ditambahkan!`, "success");
    setTimeout(() => tampilkanBuku(), 1500);
}

function menerbitkanBuku() {
    const content = document.getElementById("content");
    if (daftarBuku.length === 0) {
        content.innerHTML = `
            <h2>🗑️ Hapus Buku</h2>
            <div class="error-message"><p>Tidak ada buku yang dapat dihapus</p></div>
        `;
        return;
    }
    let bukuList = '';
    daftarBuku.forEach(buku => {
        bukuList += `<div class="book-item"><strong>${buku.nomorAkses}</strong> - ${buku.judul} <small>(${buku.penulis})</small></div>`;
    });
    content.innerHTML = `
        <h2>🗑️ Hapus Buku dari Perpustakaan</h2>
        <div class="form-container">
            <div class="form-group"><label for="nomorHapus">🔢 Nomor Akses Buku yang akan dihapus:</label><input type="number" id="nomorHapus" placeholder="Contoh: 1, 2, 3..." min="1"></div>
            <button class="btn" onclick="hapusBuku()">🗑️ Hapus Buku</button>
        </div>
        <div class="book-list"><h3>📋 Daftar Buku Tersedia:</h3>${bukuList}</div>
    `;
}

function hapusBuku() {
    const nomorAkses = parseInt(document.getElementById("nomorHapus").value);
    if (isNaN(nomorAkses) || nomorAkses <= 0) {
        showMessage("❌ Nomor akses tidak valid!", "error");
        return;
    }
    const index = daftarBuku.findIndex(buku => buku.nomorAkses === nomorAkses);
    if (index === -1) {
        showMessage("❌ Buku dengan nomor akses tersebut tidak ditemukan!", "error");
        return;
    }
    const judulBuku = daftarBuku[index].judul;
    daftarBuku.splice(index, 1);
    showMessage(`✅ Buku "${judulBuku}" berhasil dihapus!`, "success");
    setTimeout(() => tampilkanBuku(), 1500);
}

function showMessage(message, type) {
    const content = document.getElementById("content");
    const messageClass = type === "error" ? "error-message" : "success-message";
    const messageDiv = document.createElement("div");
    messageDiv.className = messageClass;
    messageDiv.innerHTML = `<p>${message}</p>`;
    content.insertBefore(messageDiv, content.firstChild);
    setTimeout(() => messageDiv.remove(), 3000);
}

window.onload = tampilkanBuku();