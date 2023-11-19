const addRow = () => {
    const table = document.getElementById("myTable");
    const newRow = table.insertRow(table.rows.length);
    const cells = [];
    const cols = table.rows[0].cells.length;
    for (var i = 0; i < cols; i++) {
        cells[i] = newRow.insertCell(i);
        cells[i].innerHTML = i < cols - 3 ? "<input type='text' class='form-control' value='0'  onClick='this.setSelectionRange(0, this.value.length)'>" : "";
    }
}

const removeRow = () => {
    const table = document.getElementById("myTable");
    if (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 1);
    }
}
const calculate = () => {
    const table  = document.getElementById("myTable");
    const rows = table.rows;
    Array.from(rows).slice(1).forEach(row => {
        const cells = row.cells;
        const cols = cells.length;
        const digits = 3;
        let [x, y, z, Rx, Ry, Rz] = Array.from(cells).slice(0, cols - 3).map(cell => parseFloat(cell.children[0].value));
        if(isNaN(x)) x = 0;
        if(isNaN(y)) y = 0;
        if(isNaN(z)) z = 0;
        if(isNaN(Rx)) Rx = 0;
        if(isNaN(Ry)) Ry = 0;
        if(isNaN(Rz)) Rz = 0;
        Rx = Rx*(Math.PI/180);
        Ry = Ry*(Math.PI/180);
        Rz = Rz*(Math.PI/180);
        const x_prime = x*Math.cos(Ry)*Math.cos(Rz) + z*Math.sin(Ry) - y*Math.cos(Ry)*Math.sin(Rz);
        const y_prime = -z*Math.cos(Ry)*Math.sin(Rx)+x*(Math.cos(Rz)*Math.sin(Rx)*Math.sin(Ry)+Math.cos(Rx)*Math.sin(Rz))+y*(Math.cos(Rx)*Math.cos(Rz)-Math.sin(Rx)*Math.sin(Ry)*Math.sin(Rz));
        const z_prime = z*Math.cos(Rx)*Math.cos(Ry)+x*(-Math.cos(Rx)*Math.cos(Rz)*Math.sin(Ry)+Math.sin(Rx)*Math.sin(Rz))+y*(Math.cos(Rz)*Math.sin(Rx)+Math.cos(Rx)*Math.sin(Ry)*Math.sin(Rz));
        cells[cols - 3].innerHTML = x_prime.toFixed(digits);
        cells[cols - 2].innerHTML = y_prime.toFixed(digits);
        cells[cols - 1].innerHTML = z_prime.toFixed(digits);
    });
}