function rupiah(angka) {
    const hasil_rupiah = "Rp " + angka.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&.");
    return hasil_rupiah;
}

export default rupiah;