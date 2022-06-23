"use strict";(self.webpackChunkserver=self.webpackChunkserver||[]).push([[8342],{70771:e=>{e.exports=JSON.parse('{"ComponentIconPicker.search.placeholder":"Buscar un icono","attribute.boolean":"Booleano","attribute.boolean.description":"Si o no, 1 o 0, verdadero o falso","attribute.component":"Componente","attribute.component.description":"Grupo de campos que puedes repetir o reutilizar","attribute.date":"Fecha","attribute.date.description":"Un selector de fechas con horas, minutos y segundos","attribute.datetime":"Fecha y hora","attribute.dynamiczone":"Zona din\xe1mica","attribute.dynamiczone.description":"Elija componentes din\xe1micamente al editar contenido","attribute.email":"Correo electr\xf3nico","attribute.email.description":"Campo de correo electr\xf3nico con formato de validaciones","attribute.enumeration":"Enumeraci\xf3n","attribute.enumeration.description":"Lista de valores, luego elija uno","attribute.json":"JSON","attribute.json.description":"Datos en formato JSON","attribute.media":"Media","attribute.media.description":"Archivos como im\xe1genes, videos, etc.","attribute.null":" ","attribute.number":"N\xfamero","attribute.number.description":"N\xfameros (entero, flotante, decimal)","attribute.password":"Contrase\xf1a","attribute.password.description":"Campo de contrase\xf1a con cifrado","attribute.relation":"Relaci\xf3n","attribute.relation.description":"Se refiere a un Tipo de Colecci\xf3n","attribute.richtext":"Texto enriquecido","attribute.richtext.description":"Un editor de texto enriquecido con opciones de formato.","attribute.text":"Texto","attribute.text.description":"Texto corto o largo como t\xedtulo o descripci\xf3n","attribute.time":"Hora","attribute.timestamp":"Marca de tiempo","attribute.uid":"UID","attribute.uid.description":"Identificador \xfanico","button.attributes.add.another":"Agregar otro campo","button.component.add":"Agregar un componente","button.component.create":"Crear nuevo componente","button.model.create":"Crear nuevo Tipo de Colecci\xf3n","button.single-types.create":"Crear nuevo tipo \xfanico","component.repeatable":"(repetible)","components.SelectComponents.displayed-value":"{number, plural, =0 {ning\xfan componente seleccionado} one {1 componente seleccionado} other {# componentes seleccionados}}","components.componentSelect.no-component-available":"Ya ha agregado todos sus componentes","components.componentSelect.no-component-available.with-search":"No hay ning\xfan componente que coincida con su b\xfasqueda","components.componentSelect.value-component":"{number} componente seleccionado (escriba para buscar un componente)","components.componentSelect.value-components":"{number} componentes seleccionados","configurations":"configuraciones","contentType.apiId-plural.description":"ID de API pluralizado","contentType.apiId-plural.label":"ID de API (Plural)","contentType.apiId-singular.description":"El UID se utiliza para generar las rutas de la API y las tablas/colecciones de la base de datos","contentType.apiId-singular.label":"ID de API (Singular)","contentType.collectionName.description":"\xdatil cuando el nombre de su Tipo de Contenido y el nombre de su tabla difieren","contentType.collectionName.label":"Nombre de la colecci\xf3n","contentType.displayName.label":"Nombre para mostrar","contentType.draftAndPublish.description":"Escribe un borrador de cada entrada antes de publicarla.","contentType.draftAndPublish.label":"Sistema de borrador/publicaci\xf3n","contentType.kind.change.warning":"Acaba de cambiar el Tipo de Contenido: la API se restablecer\xe1 (las rutas, los controladores y los servicios se sobrescribir\xe1n).","error.attributeName.reserved-name":"Este nombre no se puede utilizar en su Tipo de Contenido, ya que podr\xeda romper otras funcionalidades.","error.contentType.pluralName-used":"Este valor no puede ser igual al valor singular","error.contentType.singularName-used":"Este valor no puede ser igual al valor plural","error.contentTypeName.reserved-name":"Este nombre no se puede utilizar en su proyecto, ya que podr\xeda romper otras funcionalidades.","error.validation.enum-duplicate":"No se permiten valores duplicados","error.validation.enum-empty-string":"No se permiten cadenas de caracteres vac\xedas","error.validation.minSupMax":"No puede ser superior","error.validation.positive":"Debe ser un n\xfamero positivo","error.validation.regex":"El patr\xf3n de expresi\xf3n regular no es v\xe1lido","error.validation.relation.targetAttribute-taken":"Este nombre existe en el destino","form.attribute.component.option.add":"Agregar un componente","form.attribute.component.option.create":"Crea un nuevo componente","form.attribute.component.option.create.description":"Un componente se comparte entre tipos y componentes, estar\xe1 disponible y accesible en todas partes.","form.attribute.component.option.repeatable":"Componente repetible","form.attribute.component.option.repeatable.description":"Lo mejor para m\xfaltiples instancias (matriz) de ingredientes, meta etiquetas, etc.","form.attribute.component.option.reuse-existing":"Utilice un componente existente","form.attribute.component.option.reuse-existing.description":"Reutilice un componente ya creado para mantener la coherencia de sus datos en todos los tipos de contenido.","form.attribute.component.option.single":"Componente \xfanico","form.attribute.component.option.single.description":"Lo mejor para agrupar campos como direcci\xf3n completa, informaci\xf3n principal...","form.attribute.item.customColumnName":"Nombres de columna personalizados","form.attribute.item.customColumnName.description":"Esto es \xfatil para renombrar los nombres de las columnas de la base de datos en un formato m\xe1s completo para las respuestas de la API.","form.attribute.item.date.type.date":"fecha","form.attribute.item.date.type.datetime":"fecha y hora","form.attribute.item.date.type.time":"hora","form.attribute.item.defineRelation.fieldName":"Nombre del campo","form.attribute.item.enumeration.graphql":"Sobreescritura de nombre para GraphQL","form.attribute.item.enumeration.graphql.description":"Le permite redefinir el nombre generado por defecto para GraphQL","form.attribute.item.enumeration.placeholder":"Ej:\\nma\xf1ana\\nmediod\xeda\\nnoche","form.attribute.item.enumeration.rules":"Valores (una l\xednea por valor)","form.attribute.item.maximum":"Valor m\xe1ximo","form.attribute.item.maximumLength":"Longitud m\xe1xima","form.attribute.item.minimum":"Valor m\xednimo","form.attribute.item.minimumLength":"Longitud m\xednima","form.attribute.item.number.type":"Tipo de n\xfamero","form.attribute.item.number.type.biginteger":"entero grande (ej: 123456789)","form.attribute.item.number.type.decimal":"decimal (ej: 2.22)","form.attribute.item.number.type.float":"flotante (ej: 3.3333333333)","form.attribute.item.number.type.integer":"entero (ej: 10)","form.attribute.item.privateField":"Campo privado","form.attribute.item.privateField.description":"Este campo no aparecer\xe1 en la respuesta de la API","form.attribute.item.requiredField":"Campo obligatorio","form.attribute.item.requiredField.description":"No podr\xe1 crear un registro si este campo est\xe1 vac\xedo","form.attribute.item.settings.name":"Ajustes","form.attribute.item.text.regex":"Patr\xf3n de expresi\xf3n regular","form.attribute.item.text.regex.description":"El texto de la expresi\xf3n regular","form.attribute.item.uniqueField":"Campo \xfanico","form.attribute.item.uniqueField.description":"No podr\xe1 crear un registro si ya existe otro registro con el mismo contenido","form.attribute.media.allowed-types":"Seleccionar tipos de multimedia permitidos","form.attribute.media.allowed-types.none":"Ninguna","form.attribute.media.allowed-types.option-files":"Archivos","form.attribute.media.allowed-types.option-images":"Im\xe1genes","form.attribute.media.allowed-types.option-videos":"Videos","form.attribute.media.option.multiple":"M\xfaltiples multimedia","form.attribute.media.option.multiple.description":"Ideal para controles deslizantes, carruseles o descarga de varios archivos","form.attribute.media.option.single":"Multimedia \xfanico","form.attribute.media.option.single.description":"Lo mejor para avatar, foto de perfil o portada","form.attribute.settings.default":"Valor por defecto","form.attribute.text.option.long-text":"Texto largo","form.attribute.text.option.long-text.description":"Mejor para descripciones o biograf\xeda. La b\xfasqueda exacta est\xe1 inhabilitada.","form.attribute.text.option.short-text":"Texto corto","form.attribute.text.option.short-text.description":"Mejor para t\xedtulos, nombres, enlaces (URL). Tambi\xe9n permite una b\xfasqueda exacta en el campo.","form.button.add-components-to-dynamiczone":"Agregar componentes a la zona","form.button.add-field":"Agregar otro campo","form.button.add-first-field-to-created-component":"Agregue el primer campo al componente","form.button.add.field.to.collectionType":"Agrega otro campo a este tipo de colecci\xf3n","form.button.add.field.to.component":"Agregar otro campo a este componente","form.button.add.field.to.contentType":"Agregar campo al Tipo de Contenido","form.button.add.field.to.singleType":"Agregue otro campo a este tipo \xfanico","form.button.cancel":"Cancelar","form.button.collection-type.description":"Lo mejor para m\xfaltiples instancias como art\xedculos, productos, comentarios, etc.","form.button.configure-component":"Configurar el componente","form.button.configure-view":"Configurar la vista","form.button.continue":"Continuar","form.button.delete":"Eliminar","form.button.finish":"Terminar","form.button.save":"Guardar","form.button.select-component":"Seleccione un componente","form.button.single-type.description":"Lo mejor para una sola instancia como acerca de nosotros, p\xe1gina de inicio, etc.","form.contentType.divider.draft-publish":"BORRAR/PUBLICAR","from":"de","listView.headerLayout.description":"Construya la arquitectura de datos de su contenido","modalForm.attribute.form.base.name":"Nombre","modalForm.attribute.form.base.name.description":"No se permiten espacios para el nombre del atributo","modalForm.attribute.form.base.name.placeholder":"p. ej. Slug, URL SEO, URL can\xf3nica","modalForm.attribute.target-field":"Campo adjunto","modalForm.attribute.text.type-selection":"Tipo","modalForm.attributes.select-component":"Seleccione un componente","modalForm.attributes.select-components":"Seleccionar los componentes","modalForm.collectionType.header-create":"Crea un tipo de colecci\xf3n","modalForm.component.header-create":"Crea un componente","modalForm.components.create-component.category.label":"Seleccione una categor\xeda o ingrese un nombre para crear una nueva","modalForm.components.icon.label":"Icono","modalForm.editCategory.base.name.description":"No se permiten espacios para el nombre de la categor\xeda.","modalForm.header-edit":"Editar {name}","modalForm.header.categories":"Categor\xedas","modalForm.singleType.header-create":"Crea un tipo \xfanico","modalForm.sub-header.addComponentToDynamicZone":"Agregar nuevo componente a la zona din\xe1mica","modalForm.sub-header.attribute.create":"Agregar nuevo campo {type}","modalForm.sub-header.attribute.create.step":"Agregar nuevo componente ({step}/2)","modalForm.sub-header.attribute.edit":"Editar {name}","modalForm.sub-header.chooseAttribute.collectionType":"Seleccione un campo para su Tipo de Colecci\xf3n","modalForm.sub-header.chooseAttribute.component":"Seleccione un campo para su componente","modalForm.sub-header.chooseAttribute.singleType":"Seleccione un campo para su tipo \xfanico","modelPage.attribute.relation-polymorphic":"Relaci\xf3n (polim\xf3rfica)","modelPage.attribute.relationWith":"Vinculaci\xf3n con","none":"Ninguna","notification.info.autoreaload-disable":"Se requiere la funci\xf3n autoReload para usar este plugin. Inicie su servidor con `strapi develop`","notification.info.creating.notSaved":"Guarde su trabajo antes de crear un nuevo tipo de colecci\xf3n o componente","plugin.description.long":"Modelice la estructura de datos de su API. Cree nuevos campos y relaciones en s\xf3lo un minuto. Los archivos se crean y actualizan autom\xe1ticamente en el proyecto.","plugin.description.short":"Modelice la estructura de datos de su API.","plugin.name":"Generador de Tipo de Contenido","popUpForm.navContainer.advanced":"Configuraci\xf3n avanzada","popUpForm.navContainer.base":"Ajustes b\xe1sicos","popUpWarning.bodyMessage.cancel-modifications":"\xbfEst\xe1s seguro de que deseas cancelar tus modificaciones?","popUpWarning.bodyMessage.cancel-modifications.with-components":"\xbfEst\xe1 seguro de que desea cancelar sus modificaciones? Algunos componentes han sido creados o modificados...","popUpWarning.bodyMessage.category.delete":"\xbfEst\xe1 seguro de que desea eliminar esta categor\xeda? Tambi\xe9n se eliminar\xe1n todos los componentes.","popUpWarning.bodyMessage.component.delete":"\xbfEst\xe1 seguro de que desea eliminar este componente?","popUpWarning.bodyMessage.contentType.delete":"\xbfEst\xe1 seguro de que desea eliminar este Tipo de Contenido?","popUpWarning.draft-publish.button.confirm":"S\xed, deshabilitar","popUpWarning.draft-publish.message":"Si desactiva el sistema Borrador/Publicaci\xf3n, se eliminar\xe1n sus borradores.","popUpWarning.draft-publish.second-message":"\xbfEst\xe1s seguro de que quieres desactivarlo?","prompt.unsaved":"\xbfEst\xe1s seguro que quieres irte? Todas sus modificaciones se perder\xe1n.","relation.attributeName.placeholder":"Ej: autor, categor\xeda, etiqueta","relation.manyToMany":"tiene y pertenece a muchos","relation.manyToOne":"tiene muchos","relation.manyWay":"tiene muchas","relation.oneToMany":"pertenece a muchos","relation.oneToOne":"tiene y pertenece a una","relation.oneWay":"tiene uno","table.button.no-fields":"Agregar campo","table.content.create-first-content-type":"Crea tu primer Tipo de Colecci\xf3n","table.content.no-fields.collection-type":"Agrega tu primer campo a este Tipo de Colecci\xf3n","table.content.no-fields.component":"Agregar tu primer campo a este componente","table.headers.name":"Nombre","table.headers.type":"Tipo"}')}}]);