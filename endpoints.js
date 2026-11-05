const JSON_HEADERS = [
  { key: "Accept", value: "application/json" },
  { key: "Content-Type", value: "application/json" }
];

const PLAIN_HEADERS = [{ key: "Accept", value: "application/json" }];

const CRONODE_CATALOG = [
  {
    id: "areas",
    name: "Áreas",
    short: "AR",
    color: "#38bdf8",
    endpoints: [
      {
        id: "areas-list",
        name: "Listar áreas",
        method: "GET",
        path: "/api/v1/areas",
        description: "Obtiene el listado paginado de áreas de formación.",
        headers: PLAIN_HEADERS,
        query: [
          { key: "limit", value: "10" },
          { key: "offset", value: "0" },
          { key: "search", value: "" }
        ],
        body: null,
        requiresAuth: true
      },
      {
        id: "areas-detail",
        name: "Consultar área",
        method: "GET",
        path: "/api/v1/areas/{id}",
        description: "Obtiene el detalle de un área por su identificador.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      },
      {
        id: "areas-create",
        name: "Crear área",
        method: "POST",
        path: "/api/v1/areas",
        description: "Registra una nueva área de formación.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          nombre: "Área de Sistemas",
          descripcion: "Área de formación en tecnologías de la información",
          estado: "activa"
        },
        requiresAuth: true
      },
      {
        id: "areas-update",
        name: "Actualizar área",
        method: "PUT",
        path: "/api/v1/areas/{id}",
        description: "Actualiza los datos de un área existente.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          nombre: "Área de Sistemas Actualizada",
          descripcion: "Descripción actualizada del área",
          estado: "activa"
        },
        requiresAuth: true
      },
      {
        id: "areas-delete",
        name: "Eliminar área",
        method: "DELETE",
        path: "/api/v1/areas/{id}",
        description: "Elimina un área por su identificador.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      }
    ]
  },
  {
    id: "ambientes",
    name: "Ambientes",
    short: "AM",
    color: "#34d399",
    endpoints: [
      {
        id: "ambientes-list",
        name: "Listar ambientes",
        method: "GET",
        path: "/api/v1/ambientes",
        description: "Obtiene el listado paginado de ambientes de formación.",
        headers: PLAIN_HEADERS,
        query: [
          { key: "limit", value: "10" },
          { key: "offset", value: "0" },
          { key: "areaId", value: "" }
        ],
        body: null,
        requiresAuth: true
      },
      {
        id: "ambientes-detail",
        name: "Consultar ambiente",
        method: "GET",
        path: "/api/v1/ambientes/{id}",
        description: "Obtiene el detalle de un ambiente por su identificador.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      },
      {
        id: "ambientes-create",
        name: "Crear ambiente",
        method: "POST",
        path: "/api/v1/ambientes",
        description: "Registra un nuevo ambiente de formación.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          nombre: "Ambiente 301",
          capacidad: 30,
          areaId: 1,
          ubicacion: "Bloque B - Piso 3",
          estado: "disponible"
        },
        requiresAuth: true
      },
      {
        id: "ambientes-update",
        name: "Actualizar ambiente",
        method: "PUT",
        path: "/api/v1/ambientes/{id}",
        description: "Actualiza la información de un ambiente.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          nombre: "Ambiente 301 - Redes",
          capacidad: 25,
          areaId: 1,
          ubicacion: "Bloque B - Piso 3",
          estado: "disponible"
        },
        requiresAuth: true
      },
      {
        id: "ambientes-delete",
        name: "Eliminar ambiente",
        method: "DELETE",
        path: "/api/v1/ambientes/{id}",
        description: "Elimina un ambiente por su identificador.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      }
    ]
  },
  {
    id: "fichas",
    name: "Fichas",
    short: "FI",
    color: "#fbbf24",
    endpoints: [
      {
        id: "fichas-list",
        name: "Listar fichas",
        method: "GET",
        path: "/api/v1/fichas",
        description: "Obtiene las fichas de caracterización registradas.",
        headers: PLAIN_HEADERS,
        query: [
          { key: "limit", value: "10" },
          { key: "offset", value: "0" },
          { key: "estado", value: "activa" }
        ],
        body: null,
        requiresAuth: true
      },
      {
        id: "fichas-detail",
        name: "Consultar ficha",
        method: "GET",
        path: "/api/v1/fichas/{id}",
        description: "Obtiene el detalle de una ficha por su identificador.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      },
      {
        id: "fichas-create",
        name: "Crear ficha",
        method: "POST",
        path: "/api/v1/fichas",
        description: "Registra una nueva ficha de formación.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          codigo: "2671234",
          programa: "Análisis y Desarrollo de Software",
          fechaInicio: "2026-01-20",
          fechaFin: "2026-12-15",
          estado: "activa"
        },
        requiresAuth: true
      },
      {
        id: "fichas-update",
        name: "Actualizar ficha",
        method: "PUT",
        path: "/api/v1/fichas/{id}",
        description: "Actualiza la información de una ficha.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          codigo: "2671234",
          programa: "Análisis y Desarrollo de Software",
          fechaInicio: "2026-01-20",
          fechaFin: "2026-12-20",
          estado: "activa"
        },
        requiresAuth: true
      },
      {
        id: "fichas-delete",
        name: "Eliminar ficha",
        method: "DELETE",
        path: "/api/v1/fichas/{id}",
        description: "Elimina una ficha por su identificador.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      }
    ]
  },
  {
    id: "instructores",
    name: "Instructores",
    short: "IN",
    color: "#a78bfa",
    endpoints: [
      {
        id: "instructores-list",
        name: "Listar instructores",
        method: "GET",
        path: "/api/v1/instructores",
        description: "Obtiene el listado paginado de instructores.",
        headers: PLAIN_HEADERS,
        query: [
          { key: "limit", value: "10" },
          { key: "offset", value: "0" },
          { key: "search", value: "" }
        ],
        body: null,
        requiresAuth: true
      },
      {
        id: "instructores-detail",
        name: "Consultar instructor",
        method: "GET",
        path: "/api/v1/instructores/{id}",
        description: "Obtiene el detalle de un instructor.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      },
      {
        id: "instructores-create",
        name: "Crear instructor",
        method: "POST",
        path: "/api/v1/instructores",
        description: "Registra un nuevo instructor.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          nombre: "Julian Salazar Pineda",
          documento: "1020304050",
          email: "Jsalazar@sena.edu.co",
          telefono: "3001234567",
          areaId: 1
        },
        requiresAuth: true
      },
      {
        id: "instructores-update",
        name: "Actualizar instructor",
        method: "PUT",
        path: "/api/v1/instructores/{id}",
        description: "Actualiza la información de un instructor.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          nombre: "Julian Salazar Pineda",
          documento: "1020304050",
          email: "Jsalazar@sena.edu.co",
          telefono: "3007654321",
          areaId: 1
        },
        requiresAuth: true
      },
      {
        id: "instructores-delete",
        name: "Eliminar instructor",
        method: "DELETE",
        path: "/api/v1/instructores/{id}",
        description: "Elimina un instructor por su identificador.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      }
    ]
  },
  {
    id: "competencias",
    name: "Competencias",
    short: "CO",
    color: "#f472b6",
    endpoints: [
      {
        id: "competencias-list",
        name: "Listar competencias",
        method: "GET",
        path: "/api/v1/competencias",
        description: "Obtiene las competencias asociadas a una ficha.",
        headers: PLAIN_HEADERS,
        query: [
          { key: "limit", value: "10" },
          { key: "offset", value: "0" },
          { key: "fichaId", value: "" }
        ],
        body: null,
        requiresAuth: true
      },
      {
        id: "competencias-detail",
        name: "Consultar competencia",
        method: "GET",
        path: "/api/v1/competencias/{id}",
        description: "Obtiene el detalle de una competencia laboral.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      },
      {
        id: "competencias-create",
        name: "Crear competencia",
        method: "POST",
        path: "/api/v1/competencias",
        description: "Registra una competencia dentro de una ficha.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          codigo: "220501046",
          nombre: "Construir aplicaciones de software",
          fichaId: 1,
          horas: 880
        },
        requiresAuth: true
      },
      {
        id: "competencias-delete",
        name: "Eliminar competencia",
        method: "DELETE",
        path: "/api/v1/competencias/{id}",
        description: "Elimina una competencia por su identificador.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      }
    ]
  },
  {
    id: "resultados",
    name: "Resultados de Aprendizaje",
    short: "RA",
    color: "#60a5fa",
    endpoints: [
      {
        id: "resultados-list",
        name: "Listar resultados",
        method: "GET",
        path: "/api/v1/resultados-aprendizaje",
        description: "Obtiene los resultados de aprendizaje por competencia.",
        headers: PLAIN_HEADERS,
        query: [
          { key: "limit", value: "10" },
          { key: "offset", value: "0" },
          { key: "competenciaId", value: "" }
        ],
        body: null,
        requiresAuth: true
      },
      {
        id: "resultados-create",
        name: "Crear resultado",
        method: "POST",
        path: "/api/v1/resultados-aprendizaje",
        description: "Registra un resultado de aprendizaje.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          codigo: "220501046-01",
          descripcion: "Diseñar la interfaz de usuario del sistema",
          competenciaId: 1
        },
        requiresAuth: true
      },
      {
        id: "resultados-update",
        name: "Actualizar resultado",
        method: "PUT",
        path: "/api/v1/resultados-aprendizaje/{id}",
        description: "Actualiza un resultado de aprendizaje.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          codigo: "220501046-01",
          descripcion: "Diseñar y validar la interfaz de usuario",
          competenciaId: 1
        },
        requiresAuth: true
      },
      {
        id: "resultados-delete",
        name: "Eliminar resultado",
        method: "DELETE",
        path: "/api/v1/resultados-aprendizaje/{id}",
        description: "Elimina un resultado de aprendizaje.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      }
    ]
  },
  {
    id: "asignaciones",
    name: "Asignaciones",
    short: "AS",
    color: "#fb923c",
    endpoints: [
      {
        id: "asignaciones-list",
        name: "Listar asignaciones",
        method: "GET",
        path: "/api/v1/asignaciones",
        description: "Consulta las asignaciones de instructores y ambientes.",
        headers: PLAIN_HEADERS,
        query: [
          { key: "limit", value: "10" },
          { key: "offset", value: "0" },
          { key: "instructorId", value: "" },
          { key: "fichaId", value: "" }
        ],
        body: null,
        requiresAuth: true
      },
      {
        id: "asignaciones-create",
        name: "Crear asignación",
        method: "POST",
        path: "/api/v1/asignaciones",
        description: "Asigna un instructor a una ficha, competencia y ambiente.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          instructorId: 1,
          fichaId: 1,
          competenciaId: 1,
          ambienteId: 1,
          fecha: "2026-02-10",
          horaInicio: "07:00",
          horaFin: "12:00"
        },
        requiresAuth: true
      },
      {
        id: "asignaciones-update",
        name: "Actualizar asignación",
        method: "PATCH",
        path: "/api/v1/asignaciones/{id}",
        description: "Actualiza parcialmente una asignación existente.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          estado: "confirmada",
          observaciones: "Asignación validada por coordinación"
        },
        requiresAuth: true
      },
      {
        id: "asignaciones-delete",
        name: "Eliminar asignación",
        method: "DELETE",
        path: "/api/v1/asignaciones/{id}",
        description: "Elimina una asignación por su identificador.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      }
    ]
  },
  {
    id: "auth",
    name: "Auth",
    short: "AU",
    color: "#a3e635",
    endpoints: [
      {
        id: "auth-authenticate",
        name: "Iniciar sesión",
        method: "POST",
        path: "/api/v1/auth/authenticate",
        description: "Autentica un usuario y devuelve el JWT de acceso.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          email: "instructor@senacpic.edu.co",
          password: "Sena2026*"
        },
        requiresAuth: false
      },
      {
        id: "auth-register",
        name: "Registrar usuario",
        method: "POST",
        path: "/api/v1/auth/register",
        description: "Registra un nuevo usuario en el sistema.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          email: "nuevo.instructor@senacpic.edu.co",
          password: "Sena2026*",
          nombre: "Nuevo Instructor",
          rol: "instructor"
        },
        requiresAuth: false
      },
      {
        id: "auth-me",
        name: "Perfil autenticado",
        method: "GET",
        path: "/api/v1/auth/me",
        description: "Devuelve la información del usuario autenticado.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      },
      {
        id: "auth-refresh",
        name: "Refrescar token",
        method: "POST",
        path: "/api/v1/auth/refresh",
        description: "Genera un nuevo access token usando el refresh token.",
        headers: JSON_HEADERS,
        query: [],
        body: {
          refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        },
        requiresAuth: false
      },
      {
        id: "auth-logout",
        name: "Cerrar sesión",
        method: "POST",
        path: "/api/v1/auth/logout",
        description: "Invalida la sesión y el token actual.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      }
    ]
  },
  {
    id: "archivos",
    name: "Archivos / Uploads",
    short: "FI",
    color: "#22d3ee",
    endpoints: [
      {
        id: "archivos-list",
        name: "Listar archivos",
        method: "GET",
        path: "/api/v1/archivos",
        description: "Obtiene el listado de archivos cargados al sistema.",
        headers: PLAIN_HEADERS,
        query: [
          { key: "limit", value: "10" },
          { key: "offset", value: "0" }
        ],
        body: null,
        requiresAuth: true
      },
      {
        id: "archivos-upload",
        name: "Subir archivo",
        method: "POST",
        path: "/api/v1/archivos/upload",
        description: "Carga un archivo mediante multipart/form-data.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        bodyType: "multipart",
        requiresAuth: true
      },
      {
        id: "archivos-detail",
        name: "Consultar archivo",
        method: "GET",
        path: "/api/v1/archivos/{id}",
        description: "Obtiene los metadatos de un archivo cargado.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      },
      {
        id: "archivos-delete",
        name: "Eliminar archivo",
        method: "DELETE",
        path: "/api/v1/archivos/{id}",
        description: "Elimina un archivo por su identificador.",
        headers: PLAIN_HEADERS,
        query: [],
        body: null,
        requiresAuth: true
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.CRONODE_CATALOG = CRONODE_CATALOG;
}
