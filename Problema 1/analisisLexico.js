//Ejercicio relacionado con análisis lexico
// Fase 1: Análisis Léxico (Scanner)
// Objetivo: Agrupar caracteres en unidades lógicas (tokens) mediante expresiones regulares.
function lexer(expresion) {
  // Definición del Alfabeto y Patrones de Tokens
  // Se utiliza el ancla '^' para garantizar que el análisis sea secuencial desde el cursor.
  const specs = [
    ['NUMERO', /^\d+(\.\d+)?/],         // Constante numérica (entera o real)
    ['OPERADOR', /^[+\-*/]/],           // Símbolos terminales aritméticos
    ['PAREN_IZQ', /^\(/],               // Delimitador de apertura
    ['PAREN_DER', /^\)/],               // Delimitador de cierre
    ['OPERANDO', /^[a-zA-Z_][a-zA-Z0-9_]*/], // Identificadores (no inician con dígito)
    ['ESPACIO', /^\s+/]                 // Caracteres no significativos (ignorar)
  ];

  let cursor = 0; // Puntero de lectura en la cadena de entrada
  const tokens = [];
  let pCount = 0; // Acumulador para validar el balanceo de paréntesis (Lógica de Pila)

  while (cursor < expresion.length) {
    const slice = expresion.slice(cursor);
    let matchFound = false;

    for (const [tipo, regex] of specs) {
      const match = regex.exec(slice);
      if (match) {
        const lexema = match[0]; // El valor textual encontrado

        if (tipo !== 'ESPACIO') {
          tokens.push(`${tipo} ${lexema}`);
          // Control semántico de anidación
          if (tipo === 'PAREN_IZQ') pCount++;
          if (tipo === 'PAREN_DER') pCount--;
        }

        cursor += lexema.length; // Avanzar el cursor según el tamaño del lexema
        matchFound = true;
        break;
      }
    }
    // Manejo de errores léxicos: Caracteres fuera del alfabeto definido
    if (!matchFound) {
      tokens.push(`ERROR ${expresion[cursor]}`);
      cursor++;
    }
  }
  
  const balance = (pCount === 0) ? "PARENTESIS BALANCEADOS" : "PARENTESIS NO BALANCEADOS";

  // Para la salida del ejercicio:
  const resultadoFinal = tokens.join(' ');
  const mensajeBalance = (pCount === 0) ? "PARÉNTESIS BALANCEADOS." : "PARÉNTESIS NO BALANCEADOS.";

  return `${resultadoFinal} ${mensajeBalance}`;
}

// Ejemplo:
console.log(lexer("12+3*(4)"));