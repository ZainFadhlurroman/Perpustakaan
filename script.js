let daftarBuku = [
    { nomorAkses: 1, judul: "Laskar Pelangi", penulis: "Andrea Hinata", penerbit: "Benteng Pustaka", jumlahBuku: 5 },
    { nomorAkses: 2, judul: "Bumi Manusia", penulis: "Andrea Hinata", penerbit: "Benteng Pustaka", jumlahBuku: 3 },
    { nomorAkses: 3, judul: "Bumi Manusia", penulis: "Andrea Hinata", penerbit: "Benteng Pustaka", jumlahBuku: 6 }
]

let nextNomorAkses = 4

function tampilkanBuku() {
    const content = document.getElementById("content")
    if (daftarBuku.length === 0) {
        content.innerHTML = "<div class='empty-state'><h3>📚</h3><h3>Daftar buku masih kosong</h3><p>Silakan tambah buku baru untuk memulai</p></div>"
    } else {
        let totalBuku = 0
        for (let t = 0; t < daftarBuku.length; t++) {
            totalBuku += daftarBuku[t].jumlahBuku
        }
        let tabelBuku = `
        <h2>Daftar Buku</h2>
        <table>
            <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Penulis</th>
                <th>Penerbit</th>
                <th>Jumlah Buku</th>
            </tr>`
        for (let i = 0; i < daftarBuku.length; i++) {
            tabelBuku += `
            <tr>
                <td>${daftarBuku[i].nomorAkses}</td>
                <td>${daftarBuku[i].judul}</td>
                <td>${daftarBuku[i].penulis}</td>
                <td>${daftarBuku[i].penerbit}</td>
                <td>${daftarBuku[i].jumlahBuku}</td>
            </tr>`
        }
        tabelBuku += `
        </table>
        <div class="total-section">
            📊 Total Buku: ${totalBuku} buah
        </div>`
        content.innerHTML = tabelBuku
    }
    content.style.display = "block"
}

function showAddForm() {
    document.getElementById('addForm').style.display = 'flex'
}

function hideAddForm() {
    document.getElementById('addForm').style.display = 'none'
    document.getElementById('judulBuku').value = ''
    document.getElementById('penulisBuku').value = ''
    document.getElementById('penerbitBuku').value = ''
    document.getElementById('jumlahBuku').value = ''
}

function showDeleteForm() {
    document.getElementById('deleteForm').style.display = 'flex'
}

function hideDeleteForm() {
    document.getElementById('deleteForm').style.display = 'none'
    document.getElementById('nomorAksesHapus').value = ''
}

function tambahBuku() {
    const judul = document.getElementById('judulBuku').value.trim()
    const penulis = document.getElementById('penulisBuku').value.trim()
    const penerbit = document.getElementById('penerbitBuku').value.trim()
    const jumlah = parseInt(document.getElementById('jumlahBuku').value)

    if (!judul || !penulis || !penerbit || !jumlah || jumlah < 1) {
        alert('Mohon lengkapi semua data dengan benar!')
        return
    }

    daftarBuku.push({
        nomorAkses: nextNomorAkses,
        judul: judul,
        penulis: penulis,
        penerbit: penerbit,
        jumlahBuku: jumlah
    })

    nextNomorAkses++
    hideAddForm()
    alert(`Buku "${judul}" berhasil ditambahkan!`)
    tampilkanBuku()
}

function hapusBuku() {
    const nomorAkses = parseInt(document.getElementById('nomorAksesHapus').value)
    if (!nomorAkses) {
        alert('Mohon masukkan nomor akses yang valid!')
        return
    }

    const index = daftarBuku.findIndex(buku => buku.nomorAkses === nomorAkses)
    if (index !== -1) {
        const judulBuku = daftarBuku[index].judul
        daftarBuku.splice(index, 1)
        hideDeleteForm()
        alert(`Buku "${judulBuku}" berhasil dihapus!`)
        tampilkanBuku()
    } else {
        alert('Nomor akses tidak ditemukan!')
    }
}
window.onload = tampilkanBuku()