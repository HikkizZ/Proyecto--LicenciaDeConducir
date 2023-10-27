Repositorio de peticiones:  [Postman Workspace](https://www.postman.com/grupo-api/workspace/api-licencias/overview)

Consideraciones

Requisito 1: 
* `user` puede generar un `post` de solicitud, limitada a una única vez por usuario.
* El usuario puede visualizar exclusivamente su propia solicitud, sin acceso a las de otros usuarios.

Requisito 2:
* `admin` puede acceder y visualizar todas las solicitudes registradas en el sistema.
* `admin` puede actualizar únicamente el `estado`de la solicitud.
* `admin` puede actualizar el `estado`de la solicitud en un plazo de hasta 72 horas desde la creación de la solicitud por parte del usuario. Si no se realiza ninguna modificación en el estado durante ese lapso, la solicitud quedará marcada con el estado `fuera de plazo` y no podrá ser objeto de más modificaciones (`put`) por ningún `admin`.
* En caso que `admin` apruebe una solicitud, se enviará una notificación al `user` correspondiente.

Requisito 3:
* Los usuarios con solicitudes `aprobadas` pueden cargar documentos en formato PDF (se puede usar una librería npm disponible para simplificar este proceso).
* Los administradores tienen la capacidad de ver (`get`) y editar (`put`) el `estado` de los formularios.
* Si `admin` modifica el `estado` de una solicitud a `aprobado`, se notificará al usuario correspondiente y se generará una agenda de disponibilidad.

//hola como están