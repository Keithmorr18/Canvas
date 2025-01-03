// Array de veículos
var vehicles = [];

// Função para iniciar a simulação
function startSimulation() {
    // Criando veículos com diferentes características
    vehicles.push(new vehicle("carro", 50, 30, "red", 30, 100, 0.2, 0.05)); // Carro
    vehicles.push(new vehicle("moto", 30, 20, "blue", 30, 150, 0.3, 0.03)); // Moto
    mySimulationArea.start();
}

// Objeto para gerenciar a área de simulação
var mySimulationArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 640;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        // Chama a função updateSimulationArea a cada 20 milissegundos
        this.interval = setInterval(updateSimulationArea, 20);
    },
    stop: function() {
        clearInterval(this.interval);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

// Construtor para os veículos
function vehicle(type, width, height, color, x, y, acceleration, friction) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.acceleration = acceleration;
    this.friction = friction;

    // Desenha o veículo na tela
    this.update = function() {
        ctx = mySimulationArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.font = "10px Arial";
        ctx.fillText(this.type, this.x, this.y - 10);
    };

    // Atualiza a posição do veículo
    this.newPos = function() {
        this.speed -= this.speed * this.friction; // Aplicar atrito
        this.x += this.speed; // Atualizar posição
        this.hitEdge();
    };

    // Aplica aceleração ao veículo
    this.accelerate = function() {
        this.speed += this.acceleration;
    };

    // Aplica frenagem ao veículo
    this.brake = function() {
        this.speed -= this.acceleration;
    };

    // Impede que o veículo saia da tela pelas laterais
    this.hitEdge = function() {
        if (this.x > mySimulationArea.canvas.width - this.width) {
            this.x = mySimulationArea.canvas.width - this.width;
            this.speed = 0;
        }
        if (this.x < 0) {
            this.x = 0;
            this.speed = 0;
        }
    };
}

// Função para atualizar a área de simulação
function updateSimulationArea() {
    mySimulationArea.clear();
    for (var i = 0; i < vehicles.length; i++) {
        vehicles[i].newPos();
        vehicles[i].update();
    }
}

// Funções para controlar os veículos através de teclas
window.addEventListener('keydown', function (e) {
    var key = e.key;
    if (key === 'ArrowRight') {
        vehicles[0].accelerate(); // Acelerar carro
    }
    if (key === 'ArrowLeft') {
        vehicles[0].brake(); // Frenar carro
    }
    if (key === 'd') {
        vehicles[1].accelerate(); // Acelerar moto
    }
    if (key === 'a') {
        vehicles[1].brake(); // Frenar moto
    }
});
