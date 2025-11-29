import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let correoUsuario = "";

document.addEventListener('DOMContentLoaded', () => {

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = document.getElementById("correoLogin").value.trim();
    const validacion = /^[0-9]+@cbtis122\.edu\.mx$/;

    if (!validacion.test(correo)) {
      alert("Correo inválido. Usa tu correo institucional.");
      return;
    }

    correoUsuario = correo;

    document.getElementById("loginSection").style.display = "none";
    document.getElementById("sugerenciasSection").style.display = "block";
    document.getElementById("encuestaSection").style.display = "block";
    document.getElementById("evalDocenteSection").style.display = "block";
    document.getElementById("ambienteEscolarSection").style.display = "block";
    document.getElementById("servicioEscolarSection").style.display = "block";
  });

  function obtenerGradoGrupo(gradoID, grupoID) {
    const grado = document.getElementById(gradoID)?.value || "";
    const grupo = document.getElementById(grupoID)?.value || "";
    return { grado, grupo };
  }


  document.getElementById("sugerenciasForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const { grado, grupo } = obtenerGradoGrupo("gradoSugerencia", "grupoSugerencia");

    if (!grado || !grupo) {
      alert("Selecciona tu grado y grupo.");
      return;
    }

    const mensaje = document.getElementById("mensaje").value.trim();
    if (!mensaje) {
      alert("Escribe tu sugerencia.");
      return;
    }

    try {
      await addDoc(collection(db, "sugerencias"), {
        correo: correoUsuario,
        grado,
        grupo,
        mensaje,
        fecha: new Date()
      });

      alert("Sugerencia enviada.");
      e.target.reset();

    } catch (error) {
      console.error(error);
      alert("Error al enviar sugerencia.");
    }
  });

  document.getElementById("encuestaForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const { grado, grupo } = obtenerGradoGrupo("gradoEncuesta", "grupoEncuesta");

    if (!grado || !grupo) {
      alert("Selecciona tu grado y grupo.");
      return;
    }

    const sentimiento = document.getElementById("sentimiento").value;
    const ambiente = document.getElementById("ambiente").value;
    const situaciones = document.getElementById("situaciones").value.trim();
    const bullying = document.getElementById("bullying").value.trim();

    if (!sentimiento || !ambiente) {
      alert("Llena los campos obligatorios.");
      return;
    }

    try {
      await addDoc(collection(db, "encuesta_mensual"), {
        correo: correoUsuario,
        grado,
        grupo,
        sentimiento,
        ambiente,
        situaciones,
        bullying,
        fecha: new Date()
      });

      alert("Encuesta enviada.");
      e.target.reset();

    } catch (error) {
      console.error(error);
      alert("Error al enviar encuesta.");
    }
  });

  document.getElementById("evalDocenteForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const { grado, grupo } = obtenerGradoGrupo("gradoDocente", "grupoDocente");

    if (!grado || !grupo) {
      alert("Selecciona tu grado y grupo.");
      return;
    }

    const nombreDocente = document.getElementById("nombreDocente").value.trim();
    const materiaDocente = document.getElementById("materiaDocente").value.trim();
    const explicar = document.getElementById("explicar").value;
    const horarios = document.getElementById("horarios").value;
    const trato = document.getElementById("trato").value;
    const dominio = document.getElementById("dominio").value;

    try {
      await addDoc(collection(db, "evaluacion_docente"), {
        correo: correoUsuario,
        grado,
        grupo,
        nombreDocente,
        materiaDocente,
        explicar,
        horarios,
        trato,
        dominio,
        fecha: new Date()
      });

      alert("Evaluación enviada.");
      e.target.reset();

    } catch (error) {
      console.error(error);
      alert("No se pudo enviar la evaluación.");
    }
  });

  document.getElementById("ambienteEscolarForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectGrado = document.querySelector("#ambienteEscolarSection .grado");
    const selectGrupo = document.querySelector("#ambienteEscolarSection .grupo");

    const grado = selectGrado.value;
    const grupo = selectGrupo.value;

    if (!grado || !grupo) {
      alert("Selecciona tu grado y grupo.");
      return;
    }

    const ambGrupo = document.getElementById("ambGrupo").value;
    const respeto = document.getElementById("respeto").value;
    const talleres = document.getElementById("talleres").value;
    const seguridad = document.getElementById("seguridad").value;

    try {
      await addDoc(collection(db, "evaluacion_ambiente_escolar"), {
        correo: correoUsuario,
        grado,
        grupo,
        ambGrupo,
        respeto,
        talleres,
        seguridad,
        fecha: new Date()
      });

      alert("Evaluación enviada.");
      e.target.reset();

    } catch (error) {
      console.error(error);
      alert("Error al enviar evaluación.");
    }
  });

  document.getElementById("servicioEscolarForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectGrado = document.querySelector("#servicioEscolarSection .grado");
    const selectGrupo = document.querySelector("#servicioEscolarSection .grupo");

    const grado = selectGrado.value;
    const grupo = selectGrupo.value;

    if (!grado || !grupo) {
      alert("Selecciona tu grado y grupo.");
      return;
    }

    const prefectura = document.getElementById("prefectura").value;
    const controlEscolar = document.getElementById("controlEscolar").value;
    const biblioteca = document.getElementById("biblioteca").value;
    const medicos = document.getElementById("medicos").value;
    const vigilancia = document.getElementById("vigilancia").value;

    try {
      await addDoc(collection(db, "evaluacion_servicio_escolar"), {
        correo: correoUsuario,
        grado,
        grupo,
        prefectura,
        controlEscolar,
        biblioteca,
        medicos,
        vigilancia,
        fecha: new Date()
      });

      alert("Evaluación enviada.");
      e.target.reset();

    } catch (error) {
      console.error(error);
      alert("Error al enviar evaluación.");
    }
  });

});
