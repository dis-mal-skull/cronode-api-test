const CRONODE_CATALOG = [
  {
    "id": "jwt-auth",
    "module": "auth",
    "category": "jwt",
    "name": "Autenticación (Auth)",
    "short": "AU",
    "color": "#a3e635",
    "endpoints": [
      {
        "id": "jwt_auth_login",
        "name": "Iniciar Sesión (Login)",
        "method": "POST",
        "path": "/api/v1/auth/authenticate",
        "description": "Autentica un usuario y devuelve un token JWT.",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "institutional_email": "usuario@sena.edu.co",
          "password": "********"
        },
        "requiresAuth": false,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_auth_authenticated",
        "name": "Verificar Token Activo",
        "method": "GET",
        "path": "/api/v1/auth/authenticated",
        "description": "Verifica la validez de la sesión autenticada.",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "institutional_email": "usuario@sena.edu.co",
          "password": "********"
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_auth_refresh",
        "name": "Refrescar Token (Refresh Token)",
        "method": "POST",
        "path": "/api/v1/auth/refresh-token",
        "description": "Genera un nuevo token a partir de un refresh token.",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        },
        "requiresAuth": false,
        "authHeaderKey": null,
        "defaultApiKey": null
      }
    ]
  },
  {
    "id": "jwt-areas",
    "module": "areas",
    "category": "jwt",
    "name": "Áreas",
    "short": "AR",
    "color": "#38bdf8",
    "endpoints": [
      {
        "id": "jwt_areas_getAll",
        "name": "Obtener todas las áreas",
        "method": "GET",
        "path": "/api/v1/areas",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_areas_getOne",
        "name": "Obtener área por ID",
        "method": "GET",
        "path": "/api/v1/areas/1",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_areas_create",
        "name": "Crear nueva área",
        "method": "POST",
        "path": "/api/v1/areas",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "name": "Recursos Humanos",
          "observations": "Área de la empresa donde se manejan todos los procesos de recursos humanos"
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_areas_update",
        "name": "Actualizar área",
        "method": "PUT",
        "path": "/api/v1/areas/13",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "name": "Recursos Humanos editado",
          "observations": "Área EDITADA de la empresa donde se manejan todos los procesos de recursos humanos"
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_areas_delete",
        "name": "Eliminar área",
        "method": "DELETE",
        "path": "/api/v1/areas/12",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      }
    ]
  },
  {
    "id": "jwt-apprentices",
    "module": "apprentices",
    "category": "jwt",
    "name": "Aprendices",
    "short": "AP",
    "color": "#34d399",
    "endpoints": [
      {
        "id": "jwt_appr_getAll",
        "name": "Obtener todos los aprendices",
        "method": "GET",
        "path": "/api/v1/apprentices",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_appr_getOne",
        "name": "Obtener aprendiz por ID",
        "method": "GET",
        "path": "/api/v1/apprentices/23",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_appr_byCodeTab",
        "name": "Aprendices por Ficha (codeTab)",
        "method": "GET",
        "path": "/api/v1/apprentices/apprenticesByCodeTab/2873707",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_appr_create",
        "name": "Crear aprendiz",
        "method": "POST",
        "path": "/api/v1/apprentices",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "document_type": "CC",
          "document": "0000000000",
          "name": "Julian David",
          "surnames": "Marulanda Leon",
          "phone": "3000000000",
          "rh": "A+",
          "email": "usuario@sena.edu.co",
          "institutional_email": "usuario@sena.edu.co",
          "state": "CANCELADO",
          "codeTab": "2873707",
          "birthdate": "2000-05-15",
          "birthplace": "Manizales",
          "address": "Calle 65 # 23-10",
          "city": "Manizales",
          "instructor_followup_name": "Adriana Rodriguez Morales"
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_appr_update",
        "name": "Actualizar aprendiz",
        "method": "PUT",
        "path": "/api/v1/apprentices/23",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "document_type": "CC",
          "document": "0000000000",
          "name": "Julian David Actualizado",
          "surnames": "Marulanda Leon",
          "phone": "3000000000",
          "rh": "A+",
          "email": "usuario@sena.edu.co",
          "institutional_email": "usuario@sena.edu.co",
          "state": "CANCELADO",
          "codeTab": "2873707",
          "birthdate": "2000-05-15",
          "birthplace": "Manizales",
          "address": "Calle 65 # 23-10",
          "city": "Manizales",
          "instructor_followup_name": "Adriana Rodriguez Morales"
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_appr_delete",
        "name": "Eliminar aprendiz",
        "method": "DELETE",
        "path": "/api/v1/apprentices/4",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      }
    ]
  },
  {
    "id": "jwt-ambients",
    "module": "ambients",
    "category": "jwt",
    "name": "Ambientes de Formación",
    "short": "AM",
    "color": "#22d3ee",
    "endpoints": [
      {
        "id": "jwt_amb_getAll",
        "name": "Obtener todos los ambientes",
        "method": "GET",
        "path": "/api/v1/ambients",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_amb_getOne",
        "name": "Obtener ambiente por ID",
        "method": "GET",
        "path": "/api/v1/ambients/1",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_amb_schedule",
        "name": "Horario del ambiente (ambientSchedule)",
        "method": "GET",
        "path": "/api/v1/ambients/ambientSchedule/1",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_amb_create",
        "name": "Crear ambiente",
        "method": "POST",
        "path": "/api/v1/ambients",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "name": "Auditorio Milton Gaviria",
          "state": "En reparacion",
          "usability": "Auditorio principal de la regional Caldas para los eventos internos de la regional"
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_amb_update",
        "name": "Actualizar ambiente",
        "method": "PUT",
        "path": "/api/v1/ambients/34",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "name": "Auditorio Milton Gaviria editados",
          "state": "Activo",
          "usability": "Auditorio principal de la regional Caldas para los eventos internos de la regional"
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_amb_delete",
        "name": "Eliminar ambiente",
        "method": "DELETE",
        "path": "/api/v1/ambients/34",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      }
    ]
  },
  {
    "id": "jwt-groups",
    "module": "groups",
    "category": "jwt",
    "name": "Grupos (Fichas)",
    "short": "GR",
    "color": "#fbbf24",
    "endpoints": [
      {
        "id": "jwt_grp_getAll",
        "name": "Obtener todos los grupos",
        "method": "GET",
        "path": "/api/v1/groups",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_grp_active",
        "name": "Grupos activos (getAllActiveGroups)",
        "method": "GET",
        "path": "/api/v1/groups/activeGroups",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_grp_paginated",
        "name": "Grupos activos paginados",
        "method": "GET",
        "path": "/api/v1/groups/activeGroupsPaginated",
        "description": "",
        "headers": [],
        "query": [
          {
            "key": "startIndex",
            "value": "0"
          },
          {
            "key": "quantity",
            "value": "4"
          }
        ],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_grp_byInstructor",
        "name": "Grupos activos por instructor",
        "method": "GET",
        "path": "/api/v1/groups/activeGroupsByInstructor/38",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_grp_getOne",
        "name": "Obtener grupo por ID",
        "method": "GET",
        "path": "/api/v1/groups/12",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_grp_byCodeTab",
        "name": "Grupo por Número de Ficha (codeTab)",
        "method": "GET",
        "path": "/api/v1/groups/groupByCodeTab/2996183",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_grp_mobile",
        "name": "Grupo versión móvil (groupMobile)",
        "method": "GET",
        "path": "/api/v1/groups/groupMobile/2873707",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_grp_exportExcel",
        "name": "Exportar programación a Excel",
        "method": "GET",
        "path": "/api/v1/groups/exportExcel/2847473/2025-12-01/2025-12-07",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_grp_create",
        "name": "Crear grupo",
        "method": "POST",
        "path": "/api/v1/groups",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "codeTab": "9090909",
          "ModalityId": 1,
          "quantityLearners": 26,
          "activeLearners": 13,
          "electiveStartDate": "2024-01-22",
          "electiveEndDate": "2025-10-21",
          "practiceStartDate": "2025-10-22",
          "practiceEndDate": "2026-04-21",
          "offer": "Abierta",
          "ManagerId": 25,
          "FormationProgramId": 31,
          "groupState": "formación"
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_grp_update",
        "name": "Actualizar grupo",
        "method": "PUT",
        "path": "/api/v1/groups/52",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "codeTab": "8080808",
          "ModalityId": 1,
          "quantityLearners": 26,
          "activeLearners": 13,
          "groupState": "formación"
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_grp_delete",
        "name": "Eliminar grupo",
        "method": "DELETE",
        "path": "/api/v1/groups/52",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      }
    ]
  },
  {
    "id": "jwt-users",
    "module": "users",
    "category": "jwt",
    "name": "Usuarios e Instructores",
    "short": "US",
    "color": "#a78bfa",
    "endpoints": [
      {
        "id": "jwt_usr_getAll",
        "name": "Obtener todos los usuarios",
        "method": "GET",
        "path": "/api/v1/users",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_usr_getOne",
        "name": "Obtener usuario por ID",
        "method": "GET",
        "path": "/api/v1/users/1",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_usr_instructors",
        "name": "Instructores activos",
        "method": "GET",
        "path": "/api/v1/users/instructors/activeInstructors",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_usr_learners",
        "name": "Aprendices activos (usuarios)",
        "method": "GET",
        "path": "/api/v1/users/learners/activeLearners",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_usr_schedule",
        "name": "Horario de usuario (userSchedule)",
        "method": "GET",
        "path": "/api/v1/users/userSchedule/25",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_usr_exportExcel",
        "name": "Exportar horario de usuario a Excel",
        "method": "GET",
        "path": "/api/v1/users/exportExcel/38/2025-04-29/2025-09-29",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_usr_validateHours",
        "name": "Validar horas diarias de instructor",
        "method": "GET",
        "path": "/api/v1/schedules/validate-instructor-hours",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "ConstantUserId": 27,
          "day": [
            1
          ],
          "startDate": "",
          "endDate": ""
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_usr_create",
        "name": "Crear usuario",
        "method": "POST",
        "path": "/api/v1/users",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "username": "Instructor Prueba",
          "institutional_email": "usuario@sena.edu.co",
          "personal_email": "usuario@example.com",
          "document": "0000000000",
          "birthdate": "1990-05-15",
          "phone": "3000000000",
          "gender": "M",
          "PositionId": 4,
          "RolId": 2,
          "ContractTypeId": 3,
          "state": "Activo"
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_usr_changePass",
        "name": "Cambiar contraseña de usuario",
        "method": "PUT",
        "path": "/api/v1/users/changePassword/107",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "password": "********"
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_usr_delete",
        "name": "Eliminar usuario",
        "method": "DELETE",
        "path": "/api/v1/users/107",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      }
    ]
  },
  {
    "id": "jwt-schedules",
    "module": "schedules",
    "category": "jwt",
    "name": "Horarios (Schedules)",
    "short": "SC",
    "color": "#fb923c",
    "endpoints": [
      {
        "id": "jwt_sch_getAll",
        "name": "Obtener todos los horarios",
        "method": "GET",
        "path": "/api/v1/schedules",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_sch_getOne",
        "name": "Obtener horario por ID",
        "method": "GET",
        "path": "/api/v1/schedules/1",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_sch_create",
        "name": "Crear franja de horario",
        "method": "POST",
        "path": "/api/v1/schedules",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "codeTab": "2873707",
          "color": "RED",
          "type": "PRUEBA",
          "state": "true",
          "day": 1,
          "startDate": "2025-04-29T05:00:00.000Z",
          "endDate": "2025-07-12T05:00:00.000Z",
          "summary": "PRUEBA",
          "AmbientId": 1,
          "ProgramationId": 1,
          "ConstantUserId": 1,
          "TemporaryUserId": 1,
          "LearningResultIds": 1
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_sch_updateState",
        "name": "Actualizar estado del horario",
        "method": "PUT",
        "path": "/api/v1/schedules/state/1",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_sch_delete",
        "name": "Eliminar horario",
        "method": "DELETE",
        "path": "/api/v1/schedules/1",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      }
    ]
  },
  {
    "id": "jwt-competences",
    "module": "competences",
    "category": "jwt",
    "name": "Competencias",
    "short": "CO",
    "color": "#f472b6",
    "endpoints": [
      {
        "id": "jwt_comp_getAll",
        "name": "Obtener todas las competencias",
        "method": "GET",
        "path": "/api/v1/competences",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_comp_getOne",
        "name": "Obtener competencia por ID",
        "method": "GET",
        "path": "/api/v1/competences/502",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_comp_byProgram",
        "name": "Competencias por programa",
        "method": "GET",
        "path": "/api/v1/competences/competencesByProgram/34",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_comp_create",
        "name": "Crear competencia",
        "method": "POST",
        "path": "/api/v1/competences",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "FormationProgramId": 34,
          "code": "909090909",
          "description": "PRUEBA",
          "summary": "PRUEBA",
          "hours": 900
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_comp_delete",
        "name": "Eliminar competencia",
        "method": "DELETE",
        "path": "/api/v1/competences/603",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      }
    ]
  },
  {
    "id": "jwt-learningResults",
    "module": "learningResults",
    "category": "jwt",
    "name": "Resultados de Aprendizaje",
    "short": "RA",
    "color": "#60a5fa",
    "endpoints": [
      {
        "id": "jwt_rap_getAll",
        "name": "Obtener todos los resultados",
        "method": "GET",
        "path": "/api/v1/learningResults",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_rap_getOne",
        "name": "Obtener resultado por ID",
        "method": "GET",
        "path": "/api/v1/learningResults/1624",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_rap_byCompetence",
        "name": "Resultados por competencia",
        "method": "GET",
        "path": "/api/v1/learningResults/learningResultsByCompetence/327",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_rap_create",
        "name": "Crear resultado de aprendizaje",
        "method": "POST",
        "path": "/api/v1/learningResults",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "code": "909090909",
          "summary": "PRUEBA",
          "description": "PRUEBA",
          "hours": null,
          "projectPhase": "",
          "CompetenceId": 327
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_rap_delete",
        "name": "Eliminar resultado",
        "method": "DELETE",
        "path": "/api/v1/learningResults/2975",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      }
    ]
  },
  {
    "id": "jwt-formationPrograms",
    "module": "formationPrograms",
    "category": "jwt",
    "name": "Programas de Formación",
    "short": "PF",
    "color": "#c084fc",
    "endpoints": [
      {
        "id": "jwt_fp_getAll",
        "name": "Obtener todos los programas",
        "method": "GET",
        "path": "/api/v1/formationPrograms",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_fp_getOne",
        "name": "Obtener programa por ID",
        "method": "GET",
        "path": "/api/v1/formationPrograms/31",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_fp_create",
        "name": "Crear programa de formación",
        "method": "POST",
        "path": "/api/v1/formationPrograms",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "code": "909090 V1",
          "name": "PRUEBA - 909090 V1",
          "FormationTypeId": 1,
          "occupationalProfile": ""
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_fp_profile",
        "name": "Actualizar perfil ocupacional",
        "method": "PUT",
        "path": "/api/v1/formationPrograms/updateOccupationalProfile/1",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "occupationalProfile": "Perfil ocupacional de prueba para el programa de MANEJO DE MAQUINARIA..."
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_fp_delete",
        "name": "Eliminar programa",
        "method": "DELETE",
        "path": "/api/v1/formationPrograms/43",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      }
    ]
  },
  {
    "id": "jwt-contracts",
    "module": "contracts",
    "category": "jwt",
    "name": "Contratos y Tipos",
    "short": "CT",
    "color": "#4ade80",
    "endpoints": [
      {
        "id": "jwt_cnt_getAll",
        "name": "Obtener contratos",
        "method": "GET",
        "path": "/api/v1/contracts",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_cnt_types",
        "name": "Tipos de contratos (contractTypes)",
        "method": "GET",
        "path": "/api/v1/contractTypes",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_cnt_create",
        "name": "Crear contrato",
        "method": "POST",
        "path": "/api/v1/contracts",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "name": "PRUEBA",
          "description": "PRUEBA",
          "UserId": 1,
          "startDate": "2025-04-29T05:00:00.000Z",
          "endDate": "2025-09-29T05:00:00.000Z"
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      }
    ]
  },
  {
    "id": "jwt-trimesters",
    "module": "trimesters",
    "category": "jwt",
    "name": "Trimestres",
    "short": "TR",
    "color": "#facc15",
    "endpoints": [
      {
        "id": "jwt_tri_getAll",
        "name": "Obtener todos los trimestres",
        "method": "GET",
        "path": "/api/v1/trimesters",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_tri_active",
        "name": "Trimestre activo actual",
        "method": "GET",
        "path": "/api/v1/trimesters/trimester/activetrimester",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_tri_create",
        "name": "Crear trimestre",
        "method": "POST",
        "path": "/api/v1/trimesters",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "name": "PRUEBA",
          "year": "2025",
          "state": "Activo",
          "startDate": "2025-02-10T05:00:00.000Z",
          "endDate": "2025-04-25T05:00:00.000Z"
        },
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      }
    ]
  },
  {
    "id": "jwt-reportings",
    "module": "reportings",
    "category": "jwt",
    "name": "Reportes y Estadísticas",
    "short": "RP",
    "color": "#f87171",
    "endpoints": [
      {
        "id": "jwt_rep_modality",
        "name": "Grupos por modalidad",
        "method": "GET",
        "path": "/api/v1/reportings/groupsModality",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_rep_modDetails",
        "name": "Detalle de grupos por modalidad",
        "method": "GET",
        "path": "/api/v1/reportings/groupsModalityDetails",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_rep_lastTerm",
        "name": "Grupos en último trimestre",
        "method": "GET",
        "path": "/api/v1/reportings/groupsInLastTerm",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_rep_firstTerm",
        "name": "Grupos en primer trimestre",
        "method": "GET",
        "path": "/api/v1/reportings/groupsInFirstTerm",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_rep_practice",
        "name": "Grupos en etapa productiva",
        "method": "GET",
        "path": "/api/v1/reportings/groupsInPractice",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      }
    ]
  },
  {
    "id": "jwt-geography",
    "module": "geography",
    "category": "jwt",
    "name": "Geografía y Sedes (Zonas y Municipios)",
    "short": "GE",
    "color": "#2dd4bf",
    "endpoints": [
      {
        "id": "jwt_geo_zones",
        "name": "Obtener zonas",
        "method": "GET",
        "path": "/api/v1/zones",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_geo_municipalities",
        "name": "Obtener municipios",
        "method": "GET",
        "path": "/api/v1/municipalities",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_geo_modalities",
        "name": "Obtener modalidades",
        "method": "GET",
        "path": "/api/v1/modalities",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      },
      {
        "id": "jwt_geo_userZones",
        "name": "Zonas por usuario (userZones)",
        "method": "GET",
        "path": "/api/v1/userZones",
        "description": "",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": null,
        "defaultApiKey": null
      }
    ]
  },
  {
    "id": "apiKey-ambients",
    "module": "ambients",
    "category": "apiKey",
    "name": "Ambientes (Servicios Externos)",
    "short": "AM",
    "color": "#22d3ee",
    "endpoints": [
      {
        "id": "key_amb_getAll",
        "name": "Consultar todos los ambientes",
        "method": "GET",
        "path": "/api/v1/ambients",
        "description": "Consulta externa de ambientes usando API Key maestra.",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": "x-api-key",
        "defaultApiKey": "6df3418530dd69237774158c434a7995725e84b0cbbed8e8f4d6d036d2502ffc"
      },
      {
        "id": "key_amb_getOne",
        "name": "Consultar ambiente por ID",
        "method": "GET",
        "path": "/api/v1/ambients/10",
        "description": "Consulta estado de un ambiente específico.",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": "x-api-key",
        "defaultApiKey": "ak_live_face_84762rt3"
      },
      {
        "id": "key_amb_updateOccupied",
        "name": "Actualizar ocupación (isOccupied)",
        "method": "PUT",
        "path": "/api/v1/ambients/isOccupied/10",
        "description": "Actualización en tiempo real de ocupación desde sensores/reconocimiento facial.",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "isOccupied": true
        },
        "requiresAuth": true,
        "authHeaderKey": "x-api-key",
        "defaultApiKey": "ak_live_face_84762rt3"
      },
      {
        "id": "key_amb_schedule",
        "name": "Consultar horario del ambiente",
        "method": "GET",
        "path": "/api/v1/ambients/ambientSchedule/10",
        "description": "Horario para pantallas informativas y tablets de acceso a ambientes.",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": "x-api-key",
        "defaultApiKey": "ak_live_face_84762rt3"
      }
    ]
  },
  {
    "id": "apiKey-apprentices",
    "module": "apprentices",
    "category": "apiKey",
    "name": "Aprendices (Servicios Externos)",
    "short": "AP",
    "color": "#34d399",
    "endpoints": [
      {
        "id": "key_appr_getAll",
        "name": "Consultar todos los aprendices",
        "method": "GET",
        "path": "/api/v1/apprentices",
        "description": "Listado general de aprendices para sincronización externa.",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": "x-api-key",
        "defaultApiKey": "6df3418530dd69237774158c434a7995725e84b0cbbed8e8f4d6d036d2502ffc"
      },
      {
        "id": "key_appr_byDoc",
        "name": "Consultar aprendiz por Documento",
        "method": "GET",
        "path": "/api/v1/apprentices/document/1234",
        "description": "Búsqueda por número de documento para control de acceso/asistencia.",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": "x-api-key",
        "defaultApiKey": "ak_live_autodoc_98234xz1"
      },
      {
        "id": "key_appr_byCodeTab",
        "name": "Consultar aprendices por Ficha",
        "method": "GET",
        "path": "/api/v1/apprentices/apprenticesByCodeTab/2873707",
        "description": "Lista de aprendices de una ficha para aplicaciones móviles.",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": "x-api-key",
        "defaultApiKey": "ak_live_autodoc_98234xz1"
      },
      {
        "id": "key_appr_update",
        "name": "Actualizar datos de aprendiz",
        "method": "PUT",
        "path": "/api/v1/apprentices/23",
        "description": "Actualización de datos desde plataformas de registro externas.",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "document_type": "CC",
          "document": "0000000000",
          "name": "Julian David Actualizado",
          "surnames": "Marulanda Leon",
          "phone": "3000000000",
          "rh": "A+",
          "email": "usuario@sena.edu.co",
          "institutional_email": "usuario@sena.edu.co",
          "state": "CANCELADO",
          "codeTab": "2873707"
        },
        "requiresAuth": true,
        "authHeaderKey": "x-api-key",
        "defaultApiKey": "ak_live_autodoc_98234xz1"
      }
    ]
  },
  {
    "id": "apiKey-groups",
    "module": "groups",
    "category": "apiKey",
    "name": "Grupos / Fichas (Servicios Externos)",
    "short": "GR",
    "color": "#fbbf24",
    "endpoints": [
      {
        "id": "key_grp_getAll",
        "name": "Consultar todos los grupos",
        "method": "GET",
        "path": "/api/v1/groups",
        "description": "Sincronización de fichas activas con sistemas externos.",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": "x-api-key",
        "defaultApiKey": "ak_live_autodoc_98234xz1"
      },
      {
        "id": "key_grp_byCodeTab",
        "name": "Consultar grupo por Ficha (codeTab)",
        "method": "GET",
        "path": "/api/v1/groups/groupByCodeTab/12345",
        "description": "Consulta rápida de ficha desde terminales o apps de instructores.",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": "x-api-key",
        "defaultApiKey": "ak_live_autodoc_98234xz1"
      }
    ]
  },
  {
    "id": "apiKey-users",
    "module": "users",
    "category": "apiKey",
    "name": "Instructores (Servicios Externos)",
    "short": "US",
    "color": "#a78bfa",
    "endpoints": [
      {
        "id": "key_usr_instructors",
        "name": "Consultar instructores activos",
        "method": "GET",
        "path": "/api/v1/users/instructors/activeInstructors",
        "description": "Directorio de instructores activos para sistemas biométricos.",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": "x-api-key",
        "defaultApiKey": "6df3418530dd69237774158c434a7995725e84b0cbbed8e8f4d6d036d2502ffc"
      }
    ]
  },
  {
    "id": "apiKey-formationPrograms",
    "module": "formationPrograms",
    "category": "apiKey",
    "name": "Programas de Formación (Servicios Externos)",
    "short": "PF",
    "color": "#c084fc",
    "endpoints": [
      {
        "id": "key_fp_getAll",
        "name": "Consultar programas de formación",
        "method": "GET",
        "path": "/api/v1/formationPrograms",
        "description": "Consulta de ofertas y programas de formación.",
        "headers": [],
        "query": [],
        "body": null,
        "requiresAuth": true,
        "authHeaderKey": "x-api-key",
        "defaultApiKey": "ak_live_autodoc_98234xz1"
      },
      {
        "id": "key_fp_updateProfile",
        "name": "Actualizar perfil ocupacional",
        "method": "PUT",
        "path": "/api/v1/formationPrograms/updateOccupationalProfile/1",
        "description": "",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "query": [],
        "body": {
          "occupationalProfile": "Perfil ocupacional de prueba para el programa de MANEJO DE MAQUINARIA..."
        },
        "requiresAuth": true,
        "authHeaderKey": "x-api-key",
        "defaultApiKey": "ak_live_autodoc_98234xz1"
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.CRONODE_CATALOG = CRONODE_CATALOG;
}
