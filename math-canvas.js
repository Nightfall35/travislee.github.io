const canvas = document.getElementById("mathCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.7;

function toggleNumericalAnalysis() {
    const overlay = document.getElementById("numericalAnalysisOverlay");
    overlay.style.display = overlay.style.display === "block" ? "none" : "block";
}

function plotGraph() {
    const functionInput = document.getElementById("functionInput").value;
    const f = new Function('x', `return ${functionInput}`);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    
    // Draw axes
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = '#aaa';
    ctx.stroke();
    
    ctx.beginPath();
    ctx.strokeStyle = '#0055ff';
    
    for (let x = -canvas.width / 2; x < canvas.width / 2; x++) {
        const y = f(x / 50); // Scale the function
        ctx.lineTo(canvas.width / 2 + x, canvas.height / 2 - y * 50);
    }
    
    ctx.stroke();
}

function clearGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function toggleGeometryTools() {
    const overlay = document.getElementById("geometryOverlay");
    overlay.style.display = overlay.style.display === "none" || overlay.style.display === "" ? "block" : "none";
}

function drawCircle() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
    ctx.strokeStyle = '#0055ff';
    ctx.stroke();
}

function drawTriangle() {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2 - 50);
    ctx.lineTo(canvas.width / 2 - 50, canvas.height / 2 + 50);
    ctx.lineTo(canvas.width / 2 + 50, canvas.height / 2 + 50);
    ctx.closePath();
    ctx.strokeStyle = '#0055ff';
    ctx.stroke();
}

function drawPolygon() {
    const sides = 5; // Example: pentagon
    const radius = 50;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * (2 * Math.PI);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#0055ff';
    ctx.stroke();
}

function clearGeometry() {
    clearGraph(); // This can be modified to clear only geometry if needed
}

function toggleEquationSolver() {
    const overlay = document.getElementById("equationOverlay");
    overlay.style.display = overlay.style.display === "none" || overlay.style.display === "" ? "block" : "none";
}

function solveEquation() {
    const equation = document.getElementById("equationInput").value;
    try {
        const result = math.evaluate(equation);
        document.getElementById("solutionOutput").innerText = `Solution: ${result}`;
    } catch (error) {
        document.getElementById("solutionOutput").innerText = `Error: ${error.message}`;
    }
}


function toggleMatrixOperations() {
    const overlay = document.getElementById("matrixOverlay");
    overlay.style.display = overlay.style.display === "none" || overlay.style.display === "" ? "block" : "none";
}

function addMatrices() {
    const matrixA = parseMatrix(document.getElementById("matrixInputA").value);
    const matrixB = parseMatrix(document.getElementById("matrixInputB").value);
    
    if (matrixA.length && matrixB.length && matrixA.length === matrixB.length && matrixA[0].length === matrixB[0].length) {
        const result = matrixA.map((row, i) => row.map((val, j) => val + matrixB[i][j]));
        document.getElementById("matrixOutput").innerText = `Result: ${formatMatrix(result)}`;
    } else {
        document.getElementById("matrixOutput").innerText = "Error: Matrices must be the same size.";
    }
}

function multiplyMatrices() {
    const matrixA = parseMatrix(document.getElementById("matrixInputA").value);
    const matrixB = parseMatrix(document.getElementById("matrixInputB").value);
    
    if (matrixA[0].length === matrixB.length) {
        const result = matrixA.map(row => 
            matrixB[0].map((_, j) => 
                row.reduce((sum, el, i) => sum + el * matrixB[i][j], 0)
            )
        );
        document.getElementById("matrixOutput").innerText = `Result: ${formatMatrix(result)}`;
    } else {
        document.getElementById("matrixOutput").innerText = "Error: Invalid matrix dimensions for multiplication.";
    }
}

function parseMatrix(input) {
    return input.split(';').map(row => row.split(',').map(Number));
}

function formatMatrix(matrix) {
    return matrix.map(row => row.join(',')).join('; ');
}

function startGame() {
    const overlay = document.getElementById("gameOverlay");
    overlay.style.display = "block";
    generateQuestion();
}

function toggleGame() {
    const overlay = document.getElementById("gameOverlay");
    overlay.style.display = "none";
}

let currentAnswer = 0;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    currentAnswer = num1 + num2;
    document.getElementById("mathQuestion").innerText = `What is ${num1} + ${num2}?`;
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("answerInput").value);
    const feedback = userAnswer === currentAnswer ? "Correct!" : `Wrong! The answer is ${currentAnswer}.`;
    document.getElementById("gameFeedback").innerText = feedback;
    generateQuestion();
}
function calculateCircle() {
    const radius = 50; // Example radius
    const area = math.pi * math.pow(radius, 2);
    const perimeter = 2 * math.pi * radius;
    alert(`Circle: Area = ${area}, Perimeter = ${perimeter}`);
}

function calculateRectangle() {
    const width = 100; // Example width
    const height = 50; // Example height
    const area = width * height;
    const perimeter = 2 * (width + height);
    alert(`Rectangle: Area = ${area}, Perimeter = ${perimeter}`);
}

function calculateTriangle() {
    const base = 100; // Example base
    const height = 50; // Example height
    const area = 0.5 * base * height;
    const perimeter = base + 2 * Math.sqrt(Math.pow((base / 2), 2) + Math.pow(height, 2)); // Assuming isosceles triangle
    alert(`Triangle: Area = ${area}, Perimeter = ${perimeter}`);
}
function startGame() {
    const overlay = document.getElementById("gameOverlay");
    overlay.style.display = "block";
    generateQuestion();
}

function generateQuestion() {
    const operations = ['+', '-', '*', '/'];
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = operations[Math.floor(Math.random() * operations.length)];
    currentAnswer = math.evaluate(`${num1} ${operation} ${num2}`);
    document.getElementById("mathQuestion").innerText = `What is ${num1} ${operation} ${num2}?`;
}

function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById("answerInput").value);
    const feedback = userAnswer === currentAnswer ? "Correct!" : `Wrong! The answer is ${currentAnswer}.`;
    document.getElementById("gameFeedback").innerText = feedback;
    generateQuestion();
}
// Root-Finding using the Bisection Method
function findRoot() {
    const func = document.getElementById("functionInput").value;
    const initialGuess = parseFloat(document.getElementById("initialGuess").value);
    
    let a = initialGuess - 1; // Arbitrarily chosen
    let b = initialGuess + 1; // Arbitrarily chosen
    let c;
    const tolerance = 1e-7;
    let maxIterations = 100;

    for (let i = 0; i < maxIterations; i++) {
        c = (a + b) / 2;
        if (math.evaluate(func, { x: c }) === 0 || (b - a) < tolerance) {
            break; // Root found or tolerance met
        }
        if (math.evaluate(func, { x: c }) * math.evaluate(func, { x: a }) < 0) {
            b = c;
        } else {
            a = c;
        }
    }

    document.getElementById("rootOutput").innerText = `Root: ${c}`;
}

// Numerical Integration using Trapezoidal Rule
function calculateIntegral() {
    const func = document.getElementById("integralFunctionInput").value;
    const lowerLimit = parseFloat(document.getElementById("lowerLimit").value);
    const upperLimit = parseFloat(document.getElementById("upperLimit").value);
    const n = 1000; // Number of subintervals
    const h = (upperLimit - lowerLimit) / n;

    let integral = 0.5 * (math.evaluate(func, { x: lowerLimit }) + math.evaluate(func, { x: upperLimit }));

    for (let i = 1; i < n; i++) {
        const x = lowerLimit + i * h;
        integral += math.evaluate(func, { x });
    }

    integral *= h;
    document.getElementById("integralOutput").innerText = `Integral: ${integral}`;
}

// Linear Equation Solver using Gaussian Elimination
function solveLinearEquations() {
    const equations = document.getElementById("linearEquations").value.trim().split('\n');
    const matrix = [];
    const results = [];

    equations.forEach(eq => {
        const parts = eq.split('=');
        const left = parts[0].trim();
        const right = parseFloat(parts[1].trim());

        const row = math.parse(left).compile().evaluate();
        matrix.push(row);
        results.push(right);
    });

    const solution = math.lusolve(matrix, results);
    document.getElementById("linearOutput").innerText = `Solution: ${solution}`;
}
// Newton-Raphson Method for Root-Finding
function newtonRaphson() {
    const func = document.getElementById("functionInput").value;
    const derivative = `derivative(${func})`; // Assume derivative is calculated
    const initialGuess = parseFloat(document.getElementById("initialGuess").value);
    
    let x = initialGuess;
    const tolerance = 1e-7;
    let maxIterations = 100;
    let iteration = 0;

    while (iteration < maxIterations) {
        const fx = math.evaluate(func, { x });
        const dfx = math.evaluate(derivative, { x });
        
        if (Math.abs(fx) < tolerance) break; // Root found
        
        x -= fx / dfx; // Newton-Raphson formula
        iteration++;
    }

    document.getElementById("rootOutput").innerText = `Root: ${x}`;
}
