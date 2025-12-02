let board = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
let score;
let gameOver = false;
let isAnimating = false;

function initBoard()
{
    board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
    ];
    score = 0;
    gameOver = false;
    isAnimating = false;
    updateScore();

}

function renderBoard(newFicha = null, mergedPositions = [], direction = null)
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
                if (direction)
                    cell.classList.add('slide-' + direction);
                if (newFicha && row === newFicha.row && col === newFicha.row)
                    cell.classList.add('new-tile');
                if (mergedPositions.some(pos => pos.row === row && pos.col === col))
                    cell.classList.add('merged');
            }
            grid.appendChild(cell); //lo meto en el html
        }
    }
}
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
    let points = 0;
    let i = 0;

    while (i < row.length)
    {
        if (i + 1 < row.length && row[i] === row[i + 1])
            {
                let mergedValue = row[i] * 2;
                result.push(mergedValue);
                points += mergedValue;
                i += 2;
            }
        else
        {
            result.push(row[i]);
            i += 1;
        }
    }
    return {row: result, points: points};
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
    let padded = padRow(merged.row);
    return {row: padded, points : merged.points};
}
    
    // MOVER DERECHA
    
function moveRowRight(row)
{
    let reversed = [...row].reverse();
    let moved = moveRowLeft(reversed);
    let result = moved.row.reverse();
    return {row: result, points: moved.points};
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
function moveLeft() 
{
    if (gameOver || isAnimating)
        return
    isAnimating = true;

    let oldBoard = JSON.stringify(board);
    let earnedPoints = 0;
    let mergedPositions = [];
    
    for (let row = 0; row < 4; row++) 
    {
        let result = moveRowLeft(board[row]);
        board[row] = result.row;
        earnedPoints += result.points;
    
        if (result.merged)
        {
            for (let col = 0; col < result.merged.length; col++)
                if (result.merged[col])
                    mergedPositions.push({row: row, col: col});
        }
    }
    
    if (oldBoard !== JSON.stringify(board)) {
        score += earnedPoints;
        updateScore();
        let newFicha = addRandomTile();
        renderBoard(newFicha, mergedPositions, 'left');
    }
    else
    {
        addShakeAnimation();
        renderBoard(null, [], null);
    }
    if (!gameOver && checkWin())
    {
        gameOver = true;
        setTimeout(showWinOverlay, 300);
        return;
    }
    if (!gameOver && checkLose())
    {
        gameOver = true;
        setTimeout(showLoseOverlay, 300);
        return;
    }
    setTimeout(() => {isAnimating = false;}, 150);
}

function moveRight() {
    if (gameOver || isAnimating)
        return;
    isAnimating = true;

    let oldBoard = JSON.stringify(board);
    let earnedPoints = 0;
    let mergedPositions = [];
    
    for (let row = 0; row < 4; row++) {
        let result = moveRowRight(board[row]);  // ← Cambia a moveRowRight
        board[row] = result.row;
        earnedPoints += result.points;
        
        if (result. merged) 
        {
            for (let col = 0; col < result.merged.length; col++) 
            {
                if (result.merged[col]) 
                {
                    mergedPositions.push({row: row, col: col});
                }
            }
        }
    }
    
    if (oldBoard !== JSON.stringify(board)) 
    {
        score += earnedPoints;
        updateScore();
        let newFicha = addRandomTile();
        renderBoard(newFicha, mergedPositions, 'right');  // ← Dirección: 'right'
    }
    else 
    {
        addShakeAnimation();
        renderBoard(null, [], null);
    }
    
    if (!gameOver && checkWin())
    {
        gameOver = true;
        setTimeout(showWinOverlay, 300);
        return;
    }
    
    if (!gameOver && checkLose()) 
    {
        gameOver = true;
        setTimeout(showLoseOverlay, 300);
        return;
    }
    
    setTimeout(() => {isAnimating = false;}, 150);
}

function moveUp() 
{
    if (gameOver || isAnimating)
        return;
    isAnimating = true;

    let oldBoard = JSON. stringify(board);
    let earnedPoints = 0;
    let mergedPositions = [];
    
    for (let col = 0; col < 4; col++) 
    {
        let column = getCol(col);  // Obtener columna
        let result = moveRowLeft(column);  // Usar moveRowLeft (mueve hacia "arriba" en vertical)
        setColumn(col, result.row);  // Actualizar columna
        earnedPoints += result.points;
        
        if (result.merged) {
            for (let row = 0; row < result.merged. length; row++) {  // ← Iterar sobre filas
                if (result.merged[row]) {
                    mergedPositions.push({row: row, col: col});  // ← row/col invertidos
                }
            }
        }
    }
    
    if (oldBoard !== JSON. stringify(board)) 
    {
        score += earnedPoints;
        updateScore();
        let newFicha = addRandomTile();
        renderBoard(newFicha, mergedPositions, 'up');  // ← Dirección: 'up'
    }
    else 
    {
        addShakeAnimation();
        renderBoard(null, [], null);
    }
    
    if (!gameOver && checkWin()) 
    {
        gameOver = true;
        setTimeout(showWinOverlay, 300);
        return;
    }
    
    if (! gameOver && checkLose()) 
    {
        gameOver = true;
        setTimeout(showLoseOverlay, 300);
        return;
    }
    
    setTimeout(() => {isAnimating = false;}, 150);
}
        
function moveDown() 
{
    if (gameOver || isAnimating)
        return;
    isAnimating = true;

    let oldBoard = JSON.stringify(board);
    let earnedPoints = 0;
    let mergedPositions = [];
    
    for (let col = 0; col < 4; col++) 
    {
        let column = getCol(col);
        let result = moveRowRight(column);
        setColumn(col, result.row);
        earnedPoints += result.points;
        
        if (result.merged) {
            for (let row = 0; row < result.merged.length; row++) {
                if (result.merged[row]) {
                    mergedPositions.push({row: row, col: col});
                }
            }
        }
    }
    
    if (oldBoard !== JSON.stringify(board)) 
    {
        score += earnedPoints;
        updateScore();
        let newFicha = addRandomTile();
        renderBoard(newFicha, mergedPositions, 'down');  // ← Dirección: 'down'
    }
    else 
    {
        addShakeAnimation();
        renderBoard(null, [], null);
    }
    
    if (!gameOver && checkWin()) 
    {
        gameOver = true;
        setTimeout(showWinOverlay, 300);
        return;
    }
    
    if (!gameOver && checkLose()) 
    {
        gameOver = true;
        setTimeout(showLoseOverlay, 300);
        return;
    }
    
    setTimeout(() => {isAnimating = false;}, 150);
}


function updateScore()
{
    let scoreElement = document.getElementById('score');
    scoreElement.textContent = score;

    //animacion de pop
    scoreElement.classList.remove('score-update');
    void scoreElement.offsetWidth;
    scoreElement.classList.add('score-update');
    setTimeout(() => {scoreElement. classList.remove('score-update');}, 300);


}

// Función para mostrar overlay de victoria
function showWinOverlay() 
{
    if (document.querySelector('.overlay'))
        return;

    let overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay-content win">
            <h2>🎉 ¡GANASTE!</h2>
            <p style="font-size: 24px; margin: 20px 0;">Llegaste a 2048</p>
            <p style="font-size: 18px;">Puntaje: <strong>${score}</strong></p>
            <p style="font-size: 14px; color: #999; margin-top: 20px;">Haz clic para continuar</p>
        </div>
    `;
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', () => {overlay.remove();});
}

// Función para mostrar overlay de derrota
function showLoseOverlay() 
{
    if (document.querySelector('.overlay'))
        return;

    let overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay-content lose">
            <h2>😞 Game Over</h2>
            <p style="font-size: 24px; margin: 20px 0;">¡Inténtalo de nuevo!</p>
            <p style="font-size: 18px;">Puntaje final: <strong>${score}</strong></p>
            <p style="font-size: 14px; color: #999; margin-top: 20px;">Haz clic para reiniciar</p>
        </div>
    `;
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', () => {
        overlay.remove();
        initBoard();
        addRandomTile();
        addRandomTile();
        renderBoard();
    });
}

// Función para añadir animación shake cuando no hay movimiento
function addShakeAnimation() 
{
    let grid = document.querySelector('.grid-container');
    grid.classList.add('shake');
    setTimeout(() => {grid.classList.remove('shake');}, 500);
}

function checkWin()
{
    for (let row = 0; row < 4; row++)
    {
        for (let col = 0; col < 4; col++)
        {
            if (board[row][col] === 2048)
                return true;
        }
    }
    return false;
}
// WIN CONDITION

//Comprobamos si alguna de las celdas es 2048.

// LOSE CONDITION

function hasEmptyCell()
{
    for (let row = 0; row < 4; row++)
    {
        for (let col = 0; col < 4; col++)
        {
            if (board[row][col] === 0)
                return true;
        }
    }
    return false;
}

function hasPossibleMoves()
{
    for (let row = 0; row < 4; row++)
    {
        for (let col = 0; col < 3; col++)
        {
            if (board[row][col] === board[row][col + 1])
                return true;
        }
    }
    //hay dos fichas iguales adyacentes horizontalmente
    for (let row = 0; row < 3; row++)
    {
        for (let col = 0; col < 4; col++)
        {
            if (board[row][col] === board[row + 1][col])
                return true;
        }
    }
    return false;
    // hay 2 fichas iguales adyacentes verticalmente.
}

function checkLose() {
    let empty = hasEmptyCell();    
    let moves = hasPossibleMoves();
    
    
    if (! empty && !moves) {
        return true;
    }
    
    return false;
}




//inicia el tablero todo a 0 o con numeros de prueba, lo imprime por consola.
window.onload = function() 
{
    
    initBoard();
    addRandomTile();
    addRandomTile();
    renderBoard();
    
    // Teclas
    document.addEventListener('keydown', function(event) {
        if (event.key.startsWith('Arrow')) {
            event. preventDefault();
        }
        
        switch(event.key) {
            case 'ArrowUp':
                moveUp();
                break;
            case 'ArrowDown':
                moveDown();
                break;
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowRight':
                moveRight();
                break;
        }
    });
    let restartBtn = document. getElementById('restart-btn');
    
    if (restartBtn) {
        console.log("✅ Botón encontrado, agregando event listener...");
        
        restartBtn.addEventListener('click', function() {
            
            initBoard();
            addRandomTile();
            addRandomTile();
            renderBoard();
        });
        
    }
}




