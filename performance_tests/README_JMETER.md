# Guía de Pruebas de Carga con JMeter 🚀

Este directorio contiene el Plan de Pruebas Maestro para evaluar el rendimiento de la API de Revista FILCO.

## 📋 Requisitos Previos
1. **Java JRE/JDK**: Asegúrate de tener instalado Java 8 o superior.
2. **Apache JMeter**: Descárgalo desde [jmeter.apache.org](https://jmeter.apache.org/download_jmeter.cgi).
   - Descomprime y ejecuta `bin/jmeter.bat` (Windows).

## 🧪 Contenido del Plan (`performance_test.jmx`)
El plan está configurado para simular dos perfiles de usuario:
1. **Visitantes (Thread Group 1)**:
   - 50 hilos (usuarios concurrentes).
   - Acción: Obtener artículos (`GET /api/articles`).
   - Meta: Validar latencia de lectura bajo carga media.
2. **Administradores (Thread Group 2)**:
   - 10 hilos.
   - Flujo: Login → Extraer Token JWT → Listar Usuarios (`GET /api/users`).
   - Meta: Validar seguridad y persistencia bajo estrés.

## 🚀 Cómo ejecutar las pruebas

### Opción A: Interfaz Gráfica (GUI) - Recomendado para ver resultados
1. Abre JMeter.
2. Ve a `File` -> `Open` y selecciona `performance_test.jmx`.
3. Presiona el botón **Play (Verde)**.
4. Consulta el visor **"Ver Árbol de Resultados"** para errores individuales.
5. Consulta el **"Reporte Resumen"** para ver los tiempos promedio (Latencia) y Throughput (TPS).

### Opción B: Modo No-GUI (Línea de Comandos) - Mejor para precisión
Ejecuta el siguiente comando en este directorio:
```powershell
jmeter -n -t performance_test.jmx -l results.jtl
```

## 📊 Interpretación de Resultados
- **Average (ms)**: Debería ser inferior a 500ms para una experiencia premium.
- **Error %**: Debería ser 0%. Si aumenta, revisa el Rate Limiting en `server.js`.
- **Throughput**: Cantidad de peticiones que el servidor maneja por segundo.

---
**Nota**: Asegúrate de que el backend esté corriendo (`npm start` o `npm run dev`) antes de iniciar las pruebas.
