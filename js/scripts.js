import {
  obtenerEstudiante, 
  guardarEstudiante, 
  eliminaEstudiante, 
  obtenerIdEstudiante,
  actualizarEstudiante,
} from "./ConfigFirebase.js";

const estudianteForm = document.getElementById("form-firebase");
const estudianteContenido = document.getElementById("inscritos");

let editarEstudiante = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {
  obtenerEstudiante((querySnapshot) => {
    estudianteContenido.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const estudianteInfo = doc.data();

      estudianteContenido.innerHTML += `
      <div class="box">
        <h4 class="subtitle">Estudiante: ${estudianteInfo.nombre}</h4>
        <p>Carnet: ${estudianteInfo.ci}</p>
        <p>Carrera(s): ${estudianteInfo.carrera}</p>
        <p></p>
        <div>
          <button class="button is-warning" data-id="${doc.id}">
            Editar
          </button>
          <button class="button is-danger" data-id="${doc.id}">
            Borrar
          </button>
        </div>
      </div>`;
    });

    const btnsEliminar = estudianteContenido.querySelectorAll(".is-danger");
    btnsEliminar.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await eliminaEstudiante(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEditar = estudianteContenido.querySelectorAll(".is-warning");
    btnsEditar.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await obtenerIdEstudiante(e.target.dataset.id);
          const estudianteInfo = doc.data();
          estudianteForm["nombre"].value = estudianteInfo.nombre;
          estudianteForm["ci"].value = estudianteInfo.ci;
          estudianteForm["carrera"].value = estudianteInfo.carrera;
          editarEstudiante = true;
          id = doc.id;
          estudianteForm["btn-form-firebase"].innerText = "Actualizar";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

estudianteForm.addEventListener("submit", async (e) => {
  e.preventDefault(); 
  const nombre = estudianteForm["nombre"];
  const ci = estudianteForm["ci"];
  const carrera = estudianteForm["carrera"];  
  console.log(carrera.value);
  // try {
    if (!editarEstudiante) {
      await guardarEstudiante(
        nombre.value,
        ci.value,
        carrera.value
      );
    } else {
      await actualizarEstudiante(id, {
        nombre: nombre.value,
        ci: ci.value,
        carrera: carrera.value
      });
      editarEstudiante = false;
      id = "";
      estudianteForm["btn-form-firebase"].innerText = "Guardar";
    }

    estudianteForm.reset();
  // } catch (error) {
  //   console.log(error);
  // }
});
