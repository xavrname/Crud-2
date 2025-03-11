import readline from "readline";
import { Estudiante } from "./modules/estudio.js";
import { GestorEstudiantes } from "./modules/GestorEstudiantes.js";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const gestor = new GestorEstudiantes();

function mostrarMenu() {
  console.log("\n📌 --- MENÚ PRINCIPAL ---");
  [
    "1️⃣  Agregar estudiante",
    "2️⃣  Mostrar lista de estudiantes",
    "3️⃣  Buscar estudiante (ID o Nombre)",
    "4️⃣  Modificar estudiante",
    "5️⃣  Eliminar estudiante",
    "6️⃣  Calcular promedios individuales",
    "7️⃣  Filtrar estudiantes con promedio mayor a un valor",
    "8️⃣  Generar informe académico",
    "9️⃣  Ver distribución por área",
    "🔟  Ranking de estudiantes por promedio",
    "1️⃣1️⃣  Cantidad de aprobados y reprobados",
    "1️⃣2️⃣  Mejores y peores estudiantes por área",
    "1️⃣3️⃣  Salir"
  ].forEach(opcion => console.log(opcion));

  rl.question("\n🔷 Elige una opción: ", manejarOpcion);
}

function obtenerDatosEstudiante(callback) {
  rl.question("📌 Nombre: ", (nombre) => {
    rl.question("📌 Edad: ", (edad) => {
      rl.question("📌 Nivel académico: ", (nivel) => {
        callback(new Estudiante(nombre, parseInt(edad), nivel));
      });
    });
  });
}

function manejarOpcion(opcion) {
  switch (opcion) {
    case "1":
      obtenerDatosEstudiante((estudiante) => {
        gestor.crear(estudiante);
        console.log("✅ Estudiante agregado correctamente.");
        mostrarMenu();
      });
      break;

    case "2":
      console.log("\n📋 LISTA DE ESTUDIANTES:");
      console.table(gestor.listar());
      mostrarMenu();
      break;

    case "3":
      rl.question("🔍 Introduce ID o Nombre del estudiante: ", (criterio) => {
        const resultado = gestor.buscarEstudiante(isNaN(criterio) ? criterio : parseInt(criterio));
        console.log(resultado || "⚠️ Estudiante no encontrado.");
        mostrarMenu();
      });
      break;

    case "4":
      rl.question("✏️ ID del estudiante a modificar: ", (id) => {
        obtenerDatosEstudiante((estudiante) => {
          if (gestor.actualizar(parseInt(id), estudiante)) {
            console.log("✅ Datos actualizados con éxito.");
          } else {
            console.log("⚠️ Estudiante no encontrado.");
          }
          mostrarMenu();
        });
      });
      break;

    case "5":
      rl.question("🗑️ ID del estudiante a eliminar: ", (id) => {
        console.log(gestor.eliminar(parseInt(id)) ? "✅ Estudiante eliminado." : "⚠️ Estudiante no encontrado.");
        mostrarMenu();
      });
      break;

    case "6":
      console.log("\n📊 Promedios individuales:");
      console.table(gestor.promedioPorEstudiante());
      mostrarMenu();
      break;

    case "7":
      rl.question("📈 Ingrese el promedio mínimo: ", (umbral) => {
        console.log("\n📋 Estudiantes con promedio superior:");
        console.table(gestor.estudiantesConPromedioMayor(parseFloat(umbral)));
        mostrarMenu();
      });
      break;

    case "8":
      console.log("\n📑 --- INFORME ACADÉMICO ---");
      console.log(gestor.reporteRendimientoAcademico());
      mostrarMenu();
      break;

    case "9":
      console.log("\n📌 Distribución de estudiantes por área:");
      console.table(gestor.distribucionPorArea());
      mostrarMenu();
      break;

    case "10":
      console.log("\n🏆 Ranking de estudiantes:");
      console.table(gestor.rankingPorPromedio());
      mostrarMenu();
      break;

    case "11":
      rl.question("📊 Umbral de aprobación: ", (umbral) => {
        console.log("\n✅📉 Aprobados y reprobados:");
        console.table(gestor.cantidadAprobadosReprobados(parseFloat(umbral)));
        mostrarMenu();
      });
      break;

    case "12":
      rl.question("📍 Área de estudio: ", (area) => {
        console.log("\n🎖️ Mejores y Peores Estudiantes por Área:");
        console.table(gestor.mejoresYPeoresPorArea(area));
        mostrarMenu();
      });
      break;

    case "13":
      console.log("👋 Saliendo del sistema...");
      rl.close();
      break;

    default:
      console.log("⚠️ Opción inválida. Intente de nuevo.");
      mostrarMenu();
  }
}

mostrarMenu();