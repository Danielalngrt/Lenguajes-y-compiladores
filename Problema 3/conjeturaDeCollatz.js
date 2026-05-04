// Algoritmo de Verificación de la Conjetura de Collatz
// Objetivo: Demostrar la convergencia a 1 en un intervalo numérico.
function demostrarCollatz(p, q) {
    // Precondición técnica exigida: Intervalo de datos representativo.
    if (q < 100 * p) {
        console.log("Error: El dominio no cumple la restricción q >= 100p");
        return;
    }

    for (let i = p; i <= q; i++) {
        let n = i;
        let secuencia = [n]; // Traza de estados del algoritmo

        while (n !== 1) {
            // Regla de transformación según paridad
            if (n % 2 === 0) {
                n = n / 2; // Caso Par
            } else {
                n = 3 * n + 1; // Caso Impar
            }
            secuencia.push(n);
        }
        console.log(`n=${i}: ${secuencia.join(' -> ')}`);
    }
    console.log("Demostrado para el intervalo.");
}

// Ejemplo de uso basado en el PDF [cite: 20]
demostrarCollatz(6, 600);