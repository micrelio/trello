document.addEventListener('DOMContentLoaded', function () {

    // Declarations
    ///////////////

    const baseApiUrl = 'http://localhost:3000';
    const getTaskFromAPIRest = () => {

        // GET to /tasks
        fetch(baseApiUrl + '/tasks')
            .then(response => response.json())
            .then(tasks => {
                appendTasks(tasks);
            })
            .catch(console.error)

    }

    const appendTasks = tasksArray => {
        let tasksSection = document.querySelector('main');

        tasksArray.forEach(task => {

            const taskNode = createTaskNode(task);
            tasksSection.appendChild(taskNode);

        })
    }

    const createTaskNode = taskObj => {

        // creat html string from value text
        let newTaskHtmlString = createTemplateHtmlString(taskObj)
        // console.log(newTaskHtmlString);

        // node creation from html string
        let taskNode = createNodeFromString(newTaskHtmlString)
        // console.log(taskNode)

        // add listeners
        addRemoveListener(taskNode);
        addCompleteListener(taskNode);
        //añadimos escuchapara update   
        addUpdateListener(taskNode);
        //añadimos color
        addColorListener(taskNode);
        return taskNode;

    }
    //crea el div del html
    let createTemplateHtmlString = ({
            text,
            color,
            id,
            completed
        }) =>
        `<div class="task ${completed ? 'completed': ''}" data-id="${id}" style="border-color: ${color}">
           
            
            <input class="edit_text" type="text" value="${text}" style="background-color: ${color}">
            <button class="remove">remove</button>
            <button class="complete" value="${completed}">complete</button>
            <button class="update">update</button>
            <input type="color" class='select_color'  value= ${color}>
            
        </div>`
        //value="#FF5733"
    let createNodeFromString = string => {
        let divNode = document.createElement('div');
        divNode.innerHTML = string;
        return divNode.firstChild;
    }
    let addRemoveListener = node => {
        node.querySelector('.remove').addEventListener('click', event => {
            // event.target.parentNode.remove();
            const idToDelete = node.dataset.id;
            deleteFromBackend(idToDelete).then((res) => {
                console.log(res)
                node.remove();
            }).catch(console.error)
        })
    }

    let addCompleteListener = node => {
        let texto = node.querySelector('.edit_text');
        let comp = node.querySelector('.complete');
        let color = node.querySelector('.select_color');
        node.querySelector('.complete').addEventListener('click', event => {
            //console.log(event.target.value);
            let id =   node.dataset.id;
           let taskColor = color.value;
           let text =  texto.value;
           let comple = comp.value;
           //let esto = event.target.value;
            let completed;
console.log(comple);
           if (comple === "false") {
            node.classList.toggle('completed')
           // console.log(completed);
           completed = true;
           console.log(completed);
          
           
        }
        else if (comple === "true") {
            node.classList.toggle('completed')
            completed = false; 
            //console.log(completed);
           
        } 
        // else{
        //     node.classList.toggle('completed') 
        //     completed = false; 
        // }




          
           let data_to_update = {
                     taskColor,
                     completed,
                     text,
                     id
                 };
                 console.log(data_to_update);
                 updateToBackend(data_to_update).then(() => {
                    
            })

            
            

        })
    }

    //color******************************************
    let addColorListener = node => {
        //declaracion del texto
        
        let texto = node.querySelector('.edit_text');
        let comp = node.querySelector('.complete');
        node.querySelector('.select_color').addEventListener('change', event => {
           
           let id =   node.dataset.id;
           let taskColor = event.target.value;
           let text =  texto.value;
           let completed = comp.value;
          // console.log(taskColor);
           let data_to_update = {
                     taskColor,
                     completed,
                     text,
                     id
                 };
                console.log(data_to_update);
                 updateToBackend(data_to_update).then(() => {
                    
            })
         })
        
    }
    let saveColorToBackend = color => {
        console.log(color);
        // GET to /tasks
        // GET to /tasks
        return fetch(baseApiUrl + '/tasks', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                color
            })
        })
        .then(console.log)
        .then(response => response.json())
        .then(console.log)

        .catch(console.error)
}
//ACTIVADOR DEL BOTON DE UPDATE
    let addUpdateListener = node => {
        let estate = node.querySelector('.complete')
        let color = node.querySelector('.select_color')
        let texto = node.querySelector('.edit_text');
        node.querySelector('.update').addEventListener('click', event => {
            let completed = Boolean(estate.value);
            console.log(completed)
            let id =   node.dataset.id;
            let taskColor = color.value;
            let text =  texto.value;
            //console.log(taskColor);
            let data_to_update = {
                
                text,
                completed,
                id,
                taskColor
                      
                      
                  };

                  console.log(data_to_update);
                  
                  updateToBackend(data_to_update).then(() => {
                    
                  })
        })
        
        
    }
//guardar en backend
let updateToBackend = data => {
    // GET to /tasks
    console.log(data)
    return fetch( baseApiUrl + '/tasks/' , {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { data } )
    } )
    .then( console.log )
    .then( response => response.json() )
    .then( console.log )

    .catch( console.error )
    // return fetch(baseApiUrl + '/tasks/' + data,{
    //     method: 'PUT',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         data
    //     })
    // })
    // .then(console.log)
    // .then(response => response.json())
    // .then(console.log)

    // .catch(console.error)
}
/////////////////////////////////////
    let deleteFromBackend = id => {
        // GET to /tasks
        return fetch(baseApiUrl + '/tasks/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify( { id: Number(id) } )
            })

            .then(response => response.json())


            .catch(console.error)
    }
    let saveTaskToBackend = text => {
        // GET to /tasks
        return fetch( baseApiUrl + '/tasks', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { text } )
            } )
            .then( console.log )
            .then( response => response.json() )
            .then( console.log )

            .catch( console.error )
    }
    // // add tasks
    
    let inputNode = document.querySelector('header input');
    
    inputNode.addEventListener('keyup', function (event) {
        
        
        if (event.keyCode === 13) {
            //get value from input
            let newTaskText = event.target.value;
           // console.log(event);

            saveTaskToBackend(newTaskText).then(() => {
                // creat html string from value text
                let newTaskHtmlString = createTemplateHtmlString({
                    text: newTaskText
                })
                // console.log(newTaskHtmlString);

                // node creation from html string
                let newTaskNode = createNodeFromString(newTaskHtmlString)
                // console.log(newTaskNode)

                // node inject to DOM in main
                document.querySelector('main').appendChild(newTaskNode)

                // clean value
                event.target.value = '';

                addRemoveListener(newTaskNode);
                addCompleteListener(newTaskNode);
                //añado actualizacion para el backend
                addUpdateListener(newTaskNode);
                addColorListener(newTaskNode);
            })


        }
    })

    // Encender la falla
    ////////////////////
    getTaskFromAPIRest();

})