let daftarBuku = [
  {
    nomorAkses: 1,
    judul: "Laskar Pelangi",
    penulis: "Andrea Hinata",
    penerbit: "Benteng Pustaka",
    jumlahBuku: 5,
  },
  {
    nomorAkses: 2,
    judul: "Bumi Manusia",
    penulis: "Andrea Hinata",
    penerbit: "Benteng Pustaka",
    jumlahBuku: 3,
  },
  {
    nomorAkses: 3,
    judul: "Bumi Manusia",
    penulis: "Andrea Hinata",
    penerbit: "Benteng Pustaka",
    jumlahBuku: 6,
  },
];

let nextNomorAkses = 4;

function tampilkanBuku() {
  const content = document.getElementById("content");

  if (daftarBuku.length === 0) {
    content.innerHTML = "<p>Daftar buku masih kosong</p>";
  } else {
    let totalBuku = 0;
    for (let t = 0; t < daftarBuku.length; t++) {
      totalBuku += daftarBuku[t].jumlahBuku;
    }

    let tabelBuku = `
        <h1>Daftar Buku</h1>
        <table border="1">
            <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Penulis</th>
                <th>Penerbit</th>
                <th>Jumlah Buku</th>
            </tr>`;

    for (let i = 0; i < daftarBuku.length; i++) {
      tabelBuku += `
            <tr>
                <td>${daftarBuku[i].nomorAkses}</td>
                <td>${daftarBuku[i].judul}</td>
                <td>${daftarBuku[i].penulis}</td>
                <td>${daftarBuku[i].penerbit}</td>
                <td>${daftarBuku[i].jumlahBuku}</td>
            </tr>`;
    }

    tabelBuku += `
        </table>
        <h2>Total Buku: ${totalBuku}</h2>`;

    content.innerHTML = tabelBuku;
  }
  content.style.display = "block";
}

function tambahkanBuku() {
  const content = document.getElementById("content");

  content.innerHTML = `
                <h2>Tambah Buku Baru</h2>
                <div class="form-group">
                    <label for="judul">Judul:</label>
                    <input type="text" id="judul" placeholder="Masukkan nama Judul">
                </div>
                <div class="form-group">
                    <label for="Penulis">Penulis :</label>
                    <input type="text" id="Penulis" placeholder="Masukkan nama Penulis">
                </div>
                <div class="form-group">
                    <label for="Penerbit">Penerbit :</label>
                    <input type="text" id="Penerbit" placeholder="Masukkan nama Penerbit">
                </div>
                <div class="form-group">
                    <label for="Jumlah">Jumlah Buku :</label>
                    <input type="number" id="jumlah" placeholder="Masukan jumlah Buku">
                </div>
                <button class="btn" onclick="pushBuku()">Simpan Data</button>
            `;

  content.style.display = "block";
}

function pushBuku() {
  const judul = document.getElementById("judul").value.trim();
  const penulis = document.getElementById("Penulis").value;
  const penerbit = document.getElementById("Penerbit").value;
  const jumlahBuku = parseInt(document.getElementById("jumlah").value);

  if (judul && penulis && penerbit === "") {
    alert("Semua data harus diisi");
    return;
  }

  if (isNaN(jumlahBuku) || jumlahBuku <= 0) {
    alert("Jumlah buku tidak valid");
    return;
  }

  daftarBuku.push({
    nomorAkses: nextNomorAkses,
    judul: judul,
    penulis: penulis,
    penerbit: penerbit,
    jumlahBuku: jumlahBuku,
  });

  nextNomorAkses++;

  alert("Buku berhasil ditambahkan");
  tampilkanBuku();
}

function menerbitkanBuku() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Menerbitkan Buku</h2>
    <div class="form-group">
        <label for="terbitBuku">Masukkan nomor akses yang ingin dihapus:</label>
        <input type="number" id="terbitBuku" placeholder="Contoh: 1, 2, 3...">
    </div>
    <button class="btn" onclick="deleteBuku()">Menerbitkan</button>
        <h2>Daftar Buku yang tersedia</h2>
  `;

  for (let i = 0; i < daftarBuku.length; i++) {
    content.innerHTML += `
    <h4>${daftarBuku[i].nomorAkses} = ${daftarBuku[i].judul}</h4>
    `;
  }

  content.style.display = "block";
}

function deleteBuku() {
  const targetNomorAkses = parseInt(
    document.getElementById("terbitBuku").value
  );

  if (isNaN(targetNomorAkses) || targetNomorAkses <= 0) {
    alert("Nomor akses buku tidak valid!");
    return;
  }

  daftarBuku.splice(targetNomorAkses - 1, 1);

  alert("Buku berhasil dihapus");
  tampilkanBuku();
}

function tambahinJumlahBuku() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Tambah Jumlah Buku</h2>
    <div class="form-group">
        <label for="terbitBuku">Masukkan nomor akses yang ingin ditambah:</label>
        <input type="number" id="inputNomorAkses" placeholder="Contoh: 1, 2, 3...">
    </div>
    <button class="btn" onclick="tambahJumlah()">Tambah Jumlah Buku</button>
    <h2>Daftar Buku yang tersedia</h2>
    `;
  for (let i = 0; i < daftarBuku.length; i++) {
    content.innerHTML += `
      <h4>${daftarBuku[i].judul} kode akses: ${daftarBuku[i].nomorAkses} <br><span class="underline">jumlah buku: ${daftarBuku[i].jumlahBuku}</span></h4>
      `;
  }

  content.style.display = "block";
}

function tambahJumlah() {
  const inputNomorAkses = parseInt(
    document.getElementById("inputNomorAkses").value
  );

  if (isNaN(inputNomorAkses) || inputNomorAkses <= 0) {
    alert("Nomor akses buku tidak valid!");
    return;
  }

  const buku = daftarBuku.findIndex(buku => buku.nomorAkses === inputNomorAkses);
  daftarBuku[buku].jumlahBuku++;
  alert("Jumlah buku berhasil ditambahkan");
  tampilkanBuku();
}

function kuranginJumlahBuku() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Tambah Jumlah Buku</h2>
    <div class="form-group">
        <label for="terbitBuku">Masukkan nomor akses yang ingin dikurangi:</label>
        <input type="number" id="inputNomorAkses" placeholder="Contoh: 1, 2, 3...">
    </div>
    <button class="btn" onclick="kurangJumlah()">kurangin Jumlah Buku</button>
      <h2>Daftar Buku yang tersedia</h2>

    `;
  for (let i = 0; i < daftarBuku.length; i++) {
    content.innerHTML += `
      <h4>${daftarBuku[i].judul} kode akses: ${daftarBuku[i].nomorAkses} <br><span class="underline">jumlah buku: ${daftarBuku[i].jumlahBuku}</span></h4>
      `;
  }

  content.style.display = "block";
}

function kurangJumlah() {
  const inputNomorAkses = parseInt(
    document.getElementById("inputNomorAkses").value
  );

  if (isNaN(inputNomorAkses) || inputNomorAkses <= 0) {
    alert("Nomor akses buku tidak valid!");
    return;
  }

  const buku = daftarBuku.findIndex(buku => buku.nomorAkses === inputNomorAkses);
  daftarBuku[buku].jumlahBuku--;
  alert("Jumlah buku berhasil dikurangim");
  tampilkanBuku();

  if (daftarBuku[buku].jumlahBuku === 0) {
    daftarBuku.splice(buku, 1);
  }
}

window.onload = tampilkanBuku;