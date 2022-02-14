import "./style.css"

//Crear el bolsillo 
class Bolsillo_De_Las_Tareas {

    static Reconstruyendo_instancias({ bolsillo_Tarea, id, completado, creado }) {
        
        const nueva = new Bolsillo_De_Las_Tareas( bolsillo_Tarea );
        nueva.id         = id;
        nueva.completado = completado;
        nueva.creado     = creado;
    
        return nueva;
    };
    
        constructor(tarea) {
    
            this.bolsillo_Tarea = tarea;
            this.id             = new Date().getTime();
            this.completado     = false;
            this.creado         = new Date();
        };
    };

    
    //La logica o los metodos de la tarea
    class Lista_Y_Logica_De_Las_Tareas {
    
        constructor() {
           this.cargar_en_LocalStorage();
        };
    
        todos(LaTarea) {
            this.arregloTareas.push(LaTarea);
            this.almacenar_en_LocalStorage();
        };
    
        eliminarTarea(id) {
            this.arregloTareas = this.arregloTareas.filter( tarea =>  tarea.id != id  ); 
            this.almacenar_en_LocalStorage();                                         
        };
    
        completados(id) {
            for (const tareas of this.arregloTareas) {
                if (tareas.id == id) {
                    tareas.completado = !tareas.completado;  
                };
            };
    
            this.almacenar_en_LocalStorage();
        };
    
        borrar_completados() {
            this.arregloTareas = this.arregloTareas.filter( arreglo =>  !arreglo.completado  );
            this.almacenar_en_LocalStorage();
        };
    
        almacenar_en_LocalStorage(){
            localStorage.setItem( 'Todo',JSON.stringify(this.arregloTareas));
        };
    
        cargar_en_LocalStorage(){
            (localStorage.getItem('Todo')) ?
            this.arregloTareas = JSON.parse(localStorage.getItem('Todo')) : this.arregloTareas = [];
    
            this.arregloTareas = this.arregloTareas.map( obj => Bolsillo_De_Las_Tareas.Reconstruyendo_instancias(obj) );
    
        };
    
    };
    const todo = new Lista_Y_Logica_De_Las_Tareas();
   
    //Crear html 
    const todo_list = document.querySelector('.todo-list');
    const new_todo = document.querySelector('.new-todo');
    const borrar_los_completados = document.querySelector('.clear-completed');
    
    const crearHtml = (todo) => {
    
        const html = `
        <li class="" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
                <label>${todo.bolsillo_Tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
        `
    
        const div = document.createElement('div');
        div.innerHTML = html;
    
        todo_list.append(div.firstElementChild);
    
        return div.firstElementChild;
    
    };
    todo.arregloTareas.forEach( lasTareas => { crearHtml(lasTareas) });
    
    //Evento para colocar la tarea 
    new_todo.addEventListener( 'keyup', (event) => {
    
        if ( event.keyCode === 13 && new_todo.value.length > 0 ) {
            
            const nueva_tarea = new Bolsillo_De_Las_Tareas(new_todo.value);
            todo.todos(nueva_tarea);
            crearHtml(nueva_tarea);
            new_todo.value = '';
        };
    
    });
    
    //Evento para colocar el completado
    todo_list.addEventListener( 'click', (event) => {
    
        const el_nombre = event.target.localName;
        const el_contenido  = event.target.parentElement.parentElement;
        const extraer_id    = el_contenido.getAttribute('data-id');
    
        if (el_nombre.includes('input')) {
            todo.completados(extraer_id);
            el_contenido.classList.toggle('completed');
    
        } else if (el_nombre.includes('button')) {
            todo.eliminarTarea(extraer_id)
            todo_list.removeChild(el_contenido); 
        
        };
    });
    
    //Evento para eliminar los completados
    borrar_los_completados.addEventListener( 'click', () => {
    
        todo.borrar_completados();
    
        for (let i = todo_list.children.length-1; i >= 0; i--) {
    
            const elemento = todo_list.children[i];
            
            if (elemento.classList.contains('completed')) {
                todo_list.removeChild(elemento);
            }; 
        };
    });
    
    //Los filtros 
    const filters = document.querySelector('.filters');
    const anchor = document.querySelectorAll('.filtro');
    
    filters.addEventListener( 'click', (event) => {
    
        const elementos = event.target.text;
        if (!elementos) return;
    
        anchor.forEach(element => {element.classList.remove('selected')});
        event.target.classList.add('selected');
    
        for (const Las_listas of todo_list.children) {
    
            Las_listas.classList.remove('hidden');
            const tener = Las_listas.classList.contains('completed');
    
            switch (elementos) {
    
                case 'Pendientes':
                    if (tener) {
                        Las_listas.classList.add('hidden');
                    };  
                break;
    
                case 'Completados':
                    if (!tener) {
                        Las_listas.classList.add('hidden');
                    };
                break;      
            }; 
        };
    });