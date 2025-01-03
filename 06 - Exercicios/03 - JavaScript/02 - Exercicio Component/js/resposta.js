/*Resolução
Aqui está a resolução do exercício:

script.js (pasta `js`)*/

var orangeComponent; // Variável para armazenar o componente laranja
var blueObstacle; // Variável para armazenar o obstáculo azul

function startGame() {
    myGameArea.start(); // Inicializa a área do jogo

    // Cria o componente laranja no meio do canvas
    var canvasCenterX = myGameArea.canvas.width / 2 - 25; // Posição X centralizada
    var canvasCenterY = myGameArea.canvas.height / 2 - 25; // Posição Y centralizada
    orangeComponent = new component(50, 50, "orange", canvasCenterX, canvasCenterY);

    // Cria o obstáculo azul escuro abaixo do componente laranja
    var obstacleX = myGameArea.canvas.width / 2 - 100; // Posição X centralizada
    var obstacleY = canvasCenterY + 75; // Posição Y abaixo do componente laranja
    blueObstacle = new component(200, 20, "#00008B", obstacleX, obstacleY);
}

var myGameArea = {
    canvas: document.createElement("canvas"), // Cria um novo elemento canvas
    start: function() {
        this.canvas.width = 480; // Define a largura do canvas
        this.canvas.height = 270; // Define a altura do canvas
        this.context = this.canvas.getContext("2d"); // Obtém o contexto 2D do canvas
        document.body.insertBefore(this.canvas, document.body.childNodes[0]); // Insere o canvas no corpo do documento
        this.interval = setInterval(updateGameArea, 20); // Define um intervalo para atualizar a área do jogo
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpa a área do canvas
    }
};

function component(width, height, color, x, y) {
    this.width = width; // Define a largura do componente
    this.height = height; // Define a altura do componente
    this.x = x; // Define a posição x do componente
    this.y = y; // Define a posição y do componente
    this.update = function() {
        ctx = myGameArea.context; // Obtém o contexto do canvas
        ctx.fillStyle = color; // Define a cor de preenchimento
        ctx.fillRect(this.x, this.y, this.width, this.height); // Desenha o componente no canvas
    }
}

// Função para atualizar a área do jogo a cada frame
function updateGameArea() {
    myGameArea.clear(); // Limpa a área do canvas
    orangeComponent.update(); // Atualiza e desenha o componente laranja na nova posição
    blueObstacle.update(); // Atualiza e desenha o obstáculo azul na nova posição
}
