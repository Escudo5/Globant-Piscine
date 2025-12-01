let board = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];



function initBoard()
{
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    // for (let row = 0; row < 4; row++)
    // {
    //     board[row] = []; //creo un array vacio para la fila
    //     for (let col = 0; col < 4; col++)
    //     {
    //         board[row][col] = 0;
    //     }
    // }
    console.log("Tablero iniciado", board);
}

//inicia el tablero todo a 0 o con numeros de prueba, lo imprime por consola.
window.onload = function()
{
    initBoard();
    addRandomTile();
    addRandomTile();
    renderBoard();
    let score = document.getElementById('score');
    console.log(score);
    document.addEventListener('keydown', function(event)
    {
        if (event.key.startsWith('Arrow'))
            event.preventDefault(); //para evitar scroll al pulsar las flechas
        if (event.key === 'ArrowUp')
            moveUp();
        if (event.key === 'ArrowDown')
            moveDown();
        if (event.key === 'ArrowLeft')
            moveLeft();
        if (event.key === 'ArrowRight')
            moveRight();
    });
    
}


function renderBoard()
{
    let grid = document.querySelector('.grid-container');
    grid.innerHTML = ''; // limpia todo el contenido del grid. Para teenr siempre 16 celdas. Si no habria cada vez mas celdas.
    //recorrer tablero y crear celdas
    for(let row = 0; row < 4; row++)
        {
            for(let col = 0; col < 4; col++)
                {
            let value = board[row][col]; //lee e valor de esa posicion en el tablero. row=0, col=1 board[0][1].
            let cell = document.createElement('div'); //creo  un div en memoria (no esta en HTML todavia)
            cell.classList.add('grid-cell'); //pone la clase grid-cell (estilos)
            if (value !== 0)
                {
                cell.textContent = value;
                cell.classList.add('tile-' + value); //classList = ['grid-cell', 'tile-(value)'].
            }
            grid.appendChild(cell); //lo meto en el html
        }
    }
}

//creo grid y recorro todo asignando valor en cada posicion. Creo un div por cada posicion y le meto la clase grid
//si el valor no es 0, le pongo el valor que corresponda y le doy color.


function addRandomTile()
{
    let emptyCells = [];
    for (let row = 0; row < 4; row++)
    {
        for (let col = 0; col < 4; col++)
        {
            if (board[row][col] === 0)
                emptyCells.push({row: row, col: col});
        }
    }
    //comprobar que celda esta vacia y pushearlo a emptycells para elegir una.
    
    if (emptyCells.length === 0)
        return;
    //elegir celda random vacia y añadirle valor 2 o 4.
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let randomCell = emptyCells[randomIndex];
    let value = Math.random()  < 0.9 ? 2 : 4; // si value < 0.9 pone 2, si no 4 (90% posibilidades 2)
    board[randomCell.row][randomCell.col] = value;
}


// MOVIMIENTO

//comprimir fila (quitar ceros)

function compressRow(row)
{
    let result = [];
    for (let i = 0; i < row.length; i++)
        {
            if (row[i] !== 0)
                result.push(row[i]);
        }
        return result;
    }
    
function mergeRow(row)
{
    let result = [];
    let i = 0;

    while (i < row.length)
    {
        if (i + 1 < row.length && row[i] === row[i + 1])
            {
                result.push(row[i] * 2);
                i += 2;
            }
        else
        {
            result.push(row[i]);
            i += 1;
        }
    }
    return result;
}

// si el de al lado es igual a este, los sumo y avanzo 2 casillas. Si no, añado valor normal y avanzo una.

function padRow(row)
{
    while (row.length < 4)
        {
            row.push(0);
        }
        return row;
}
    
function moveRowLeft(row) 
{
    let compressed = compressRow(row);
    let merged = mergeRow(compressed);
    let padded = padRow(merged);
    return padded;
}
    
    // MOVER DERECHA
    
function moveRowRight(row)
{
    let reversed = [...row].reverse();
    let moved = moveRowLeft(reversed);
    let result = moved.reverse();
    return result;
}
    
    
function getCol(colIndex)
{
    let column = [];
    for (let row = 0; row < 4; row++)
        column.push(board[row][colIndex]);
    return column;
}
    
function setColumn(colIndex, column)
{
    for (let row = 0; row < 4; row++)
        board[row][colIndex] = column[row];
}
    
function moveUp() 
{
    let oldBoard = JSON.stringify(board);
    for (let col = 0; col < 4; col++) {
        let column = getCol(col);
        let moved = moveRowLeft(column);
        setColumn(col, moved);
    }
    if (oldBoard !== JSON.stringify(board)) {
        addRandomTile();
    }
    renderBoard();
}
        
function moveDown()
{
    let oldBoard = JSON.stringify(board);
    for (let col = 0; col < 4; col++)
    {
        let column = getCol(col);
        let moved = moveRowRight(column);
        setColumn(col, moved);
    }
    if (oldBoard !== JSON.stringify(board))
        addRandomTile();
    renderBoard();
}
function moveLeft(row)
{
    let oldBoard = JSON.stringify(board);
    for (let row = 0; row < 4; row++)
    {
        board[row] = moveRowLeft(board[row]);
    }
    if (oldBoard !== JSON.stringify(board))
        addRandomTile();
    renderBoard();
}

function moveRight()
{
    let oldBoard = JSON.stringify(board);
    for (let row = 0; row < 4; row++)
    {
        board[row] = moveRowRight(board[row]);
    }
    if (oldBoard !== JSON.stringify(board));
        addRandomTile();
    renderBoard();
}