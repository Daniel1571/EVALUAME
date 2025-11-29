
document.addEventListener("DOMContentLoaded", () => {

    const grados = ["1", "2", "3", "4", "5", "6"];
    const grupos = [
        "A", "B", "C", "D", "E", "F", "G", "H",
        "I", "J", "K", "L", "M", "N", "O", "P",
        "Q", "R", "S", "T"
    ];

    document.querySelectorAll(".grado").forEach(select => {
        grados.forEach(g => {
            const op = document.createElement("option");
            op.value = g;
            op.textContent = `${g}°`;
            select.appendChild(op);
        });
    });

    document.querySelectorAll(".grupo").forEach(select => {
        grupos.forEach(gr => {
            const op = document.createElement("option");
            op.value = gr;
            op.textContent = gr;
            select.appendChild(op);
        });
    });

});
