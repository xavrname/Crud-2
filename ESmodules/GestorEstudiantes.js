export class GestorEstudiantes {
    constructor() {
      this.estudiantes = [];
    }
  
    crear(nombre, edad, nivel, calificaciones = {}) {
      const id = this.estudiantes.length + 1;
      this.estudiantes.push({ id, nombre, edad, nivel, calificaciones });
    }
    listar() {
        return this.estudiantes;
      }
    
      actualizar(id, nombre, edad, nivel) {
        for (let i = 0; i < this.estudiantes.length; i++) {
          if (this.estudiantes[i].id === id) {
            this.estudiantes[i] = { id, nombre, edad, nivel };
            return true;
          }
        }
        return false;
      };
      eliminar(id) {
        for (let i = 0; i < this.estudiantes.length; i++) {
          if (this.estudiantes[i].id === id) {
            this.estudiantes.splice(i, 1);
            return true;
          }
        }
        return false;
      } ;   
      listarEstudiantes() {
        return this.estudiantes.map(p => ({ nombre: p.nombre, nivel: p.nivel }));
      };

      buscarEstudiante(criterio) {
        return this.estudiantes.find(p => p.id === criterio || p.nombre.toLowerCase() === criterio.toLowerCase());
      };
      promedioPorEstudiante() {
        return this.estudiantes.map(e => {
          const notas = Object.values(e.calificaciones || {});
          const promedio = notas.length ? (notas.reduce((acc, val) => acc + val, 0) / notas.length) : 0;
          return { nombre: e.nombre, promedio: promedio.toFixed(2), nivel: e.nivel };
        });
      }
      estudiantesConPromedioMayor(umbral) {
        return this.promedioPorEstudiante().filter(e => parseFloat(e.promedio) > umbral);
      };
    
      aprobadosYReprobadosPorMateria(materia, umbral = 60) {
        const resultados = { aprobados: [], reprobados: [] };
        this.estudiantes.forEach(e => {
          if (e.calificaciones && e.calificaciones[materia] !== undefined) {
            const calificacion = e.calificaciones[materia];
            if (calificacion >= umbral) {
              resultados.aprobados.push({ nombre: e.nombre, calificacion });
            } else {
              resultados.reprobados.push({ nombre: e.nombre, calificacion });
            }
          }
        });
        return resultados;
      };
      promedioGeneralGrupo() {
        const calificacionesTotales = this.estudiantes.flatMap(e => Object.values(e.calificaciones || {}));
        const promedio = calificacionesTotales.reduce((acc, val) => acc + val, 0) / calificacionesTotales.length;
        return promedio.toFixed(2);
      };
      distribucionPorArea() {
        return this.estudiantes.reduce((acc, e) => {
          acc[e.nivel] = (acc[e.nivel] || 0) + 1;
          return acc;
        }, {});
      };
    
      rankingPorPromedio() {
        return this.promedioPorEstudiante().sort((a, b) => b.promedio - a.promedio);
      };
      mejoresYPeoresPorArea(area, cantidad = 2) {
        const estudiantesArea = this.promedioPorEstudiante().filter(e => e.nivel === area);
        return {
          mejores: estudiantesArea.sort((a, b) => b.promedio - a.promedio).slice(0, cantidad),
          peores: estudiantesArea.sort((a, b) => a.promedio - b.promedio).slice(0, cantidad),
        };
      };
    
      cantidadAprobadosReprobados(umbral = 60) {
        const resultados = { aprobados: 0, reprobados: 0 };
        this.estudiantes.forEach(e => {
          const notas = Object.values(e.calificaciones || {});
          notas.forEach(nota => {
            if (nota >= umbral) resultados.aprobados++;
            else resultados.reprobados++;
          });
        });
        return resultados;
      };
      totalEstudiantes() {
        return this.estudiantes.length;
      }
    
      reporteRendimientoAcademico() {
        return {
          totalEstudiantes: this.totalEstudiantes(),
          promedioGeneral: this.promedioGeneralGrupo(),
          mejoresEstudiantes: this.estudiantesConPromedioMayor(85),
          peoresEstudiantes: this.estudiantesConPromedioMayor(60),
        };
      }
}
