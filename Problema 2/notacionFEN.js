/**
 * EJERCICIO 2: VALIDACIÓN DE NOTACIÓN FEN (Forsyth-Edwards Notation)
 * Este módulo realiza un análisis sintáctico y semántico para verificar si una
 * cadena pertenece al lenguaje formal definido para posiciones de ajedrez.
 */

function validarFEN(cadena) {
    // 1. SEGMENTACIÓN DE CAMPOS (Análisis Sintáctico)
    // El estándar FEN exige exactamente 6 campos obligatorios delimitados por espacios[cite: 1].
    const campos = cadena.trim().split(/\s+/);

    if (campos.length !== 6) {
        return { 
            valido: false, 
            error: `Estructura inválida: se encontraron ${campos.length} campos de los 6 requeridos.` 
        };
    }

    const [tablero, turno, enroque, peon, reloj, jugada] = campos;

    // 2. VALIDACIÓN DE LA GEOMETRÍA DEL TABLERO
    // La descripción de piezas debe contener exactamente 8 filas separadas por '/'[cite: 1].
    const filas = tablero.split('/');
    if (filas.length !== 8) {
        return { 
            valido: false, 
            error: `Integridad del tablero fallida: posee ${filas.length} filas (se requieren 8).` 
        };
    }

    // 3. ANÁLISIS LÉXICO DE LAS FILAS
    // Definimos el alfabeto permitido: piezas (p,n,b,r,q,k) en mayúsculas/minúsculas y números del 1 al 8.
    const alfabetoFEN = /^[pnbrqkPNBRQK1-8]+$/;
    for (let fila of filas) {
        if (!alfabetoFEN.test(fila)) {
            return { 
                valido: false, 
                error: `Símbolo terminal no permitido detectado en la fila: "${fila}".` 
            };
        }
    }

    // 4. VALIDACIÓN SEMÁNTICA DEL TURNO
    // El campo de turno solo admite los símbolos 'w' (blancas) o 'b' (negras).
    if (!/^(w|b)$/.test(turno)) {
        return { 
            valido: false, 
            error: `Indicador de turno inválido: "${turno}". Se esperaba 'w' o 'b'.` 
        };
    }

    // Si todas las comprobaciones de la gramática FEN son exitosas:
    return { 
        valido: true, 
        mensaje: "Cadena validada exitosamente: Notación FEN correcta." 
    };
}

/**
 * BANCO DE PRUEBAS (Demostración Práctica para la Defensa)
 */
const casosDePrueba = [
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", // Válida (Inicio)
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP w KQkq - 0 1",         // Inválida (Falta fila)
    "rnbXkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", // Inválida (Léxico: pieza 'X')
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR z KQkq - 0 1"  // Inválida (Semántica: turno 'z')
];

console.log("=== ANALIZADOR SINTÁCTICO DE NOTACIÓN FEN ===");
casosDePrueba.forEach((cadena, index) => {
    const resultado = validarFEN(cadena);
    if (resultado.valido) {
        console.log(`Prueba ${index + 1}: [VÁLIDA]`);
    } else {
        console.log(`Prueba ${index + 1}: [ERROR] -> ${resultado.error}`);
    }
});