// Simulación de respuestas de IA para demo
const responses = [
  "¡Excelente pregunta! Déjame explicarte en detalle...\n\nEn términos generales, esto se relaciona con conceptos fundamentales de programación y diseño de software. La clave está en entender cómo los diferentes componentes interactúan entre sí.\n\n¿Te gustaría que profundice en algún aspecto específico?",
  
  "He analizado tu consulta y aquí está mi perspectiva:\n\n1. **Primero**, es importante considerar el contexto\n2. **Segundo**, evaluar las diferentes opciones disponibles\n3. **Tercero**, implementar la solución más adecuada\n\nRecuerda que la mejor solución depende de tus necesidades específicas.",
  
  "¡Interesante planteamiento! 🤔\n\nDesde mi análisis, puedo identificar varios puntos clave:\n\n- La arquitectura debe ser escalable\n- El código debe ser mantenible\n- La experiencia de usuario es fundamental\n\n¿Hay algo más en lo que pueda ayudarte?",
  
  "Basándome en las mejores prácticas de la industria, te recomendaría lo siguiente:\n\n```javascript\nconst solution = {\n  approach: 'modular',\n  scalability: 'high',\n  maintainability: 'excellent'\n};\n```\n\nEste enfoque te permitirá construir algo robusto y fácil de mantener.",
  
  "¡Gran pregunta! Permíteme desglosar esto:\n\n**Ventajas:**\n- Mayor flexibilidad\n- Mejor rendimiento\n- Código más limpio\n\n**Consideraciones:**\n- Curva de aprendizaje inicial\n- Requiere buena planificación\n\n¿Necesitas más detalles sobre alguno de estos puntos?",
  
  "Entiendo lo que buscas. Aquí hay una guía paso a paso:\n\n1. 📋 **Planificación**: Define claramente tus objetivos\n2. 🛠️ **Implementación**: Desarrolla de forma incremental\n3. ✅ **Testing**: Verifica cada componente\n4. 🚀 **Despliegue**: Lanza con confianza\n\n¿Te gustaría que elabore alguno de estos pasos?",
  
  "Analizando tu solicitud desde diferentes ángulos:\n\n**Perspectiva técnica:** La implementación requiere atención a los detalles y buenas prácticas de código.\n\n**Perspectiva de negocio:** Esto puede generar valor significativo si se ejecuta correctamente.\n\n**Mi recomendación:** Comenzar con un MVP y iterar basándose en feedback.",
  
  "¡Claro que sí! Esto es algo que puedo ayudarte a resolver.\n\nLa solución óptima involucra:\n\n```typescript\ninterface Solution {\n  efficiency: 'optimized';\n  readability: 'high';\n  performance: 'excellent';\n}\n```\n\nEste patrón ha demostrado ser muy efectivo en proyectos similares.",
];

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  // Simular delay de respuesta (1-3 segundos)
  const delay = Math.random() * 2000 + 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));
  
  // Seleccionar respuesta basada en hash simple del mensaje
  const hash = userMessage.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % responses.length;
  
  return responses[index];
};

export const generateConversationTitle = (firstMessage: string): string => {
  // Generar título basado en el primer mensaje
  const words = firstMessage.split(" ").slice(0, 5);
  const title = words.join(" ");
  return title.length > 30 ? `${title.substring(0, 30)}...` : title || "Nueva conversación";
};

