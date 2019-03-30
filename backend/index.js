const express = require( 'express' );
const app = express();

const fs = require( 'fs' );

const port = Number( process.argv[ 2 ] ) || 3000;


// BODY PARSE TO JSON
app.use( express.json() );


// enable CORS
app.use( function ( req, res, next ) {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
} );


app.get( '/tasks', ( req, res ) => {

     const stringJson = fs.readFileSync( './bd.json', 'UTF-8' );

     const data = JSON.parse( stringJson );
     res.status( 200 ).json( data.tasks );

} );
// creamos delet
app.delete( '/tasks/:id', ( req, res ) => {
  
    // leemos el archivo del documento json nos devuelve un string
    const stringJson = fs.readFileSync( './bd.json', 'UTF-8' );//const stringJson = fs.readFileSync( './bd.json', 'UTF-8' );
    //el string devuelto lo transformamos en un objeto javascript
    const data = JSON.parse( stringJson );
    // convertimos el id en number
        const id = Number(req.params.id);
        
        for (let i = 0; i < data.tasks.length; i++) {
//si el id es igual al dato en tasks posicion del contador dato id,
// splice en el numero del dato con el 1 lo borra
            if (id === data.tasks[i].id) {
                data.tasks.splice(i,1)
            }
            
        }
    

    //convierte el dato en cadena y lo escribe en la hoja json indicada
    const newDataString = JSON.stringify( data );
    fs.writeFileSync( './bd.json', newDataString );
   
    res.status( 200 ).json( {message: id + 'tasks deleted'} );

} );



//AQUI REALIZAMOS EL UPDATE EN EL BACK
app.put('/tasks', (req, res) => {
   console.log(req.body.data);
    
    // if (typeof req.body.data === "object") {
        try {

            // COGER EL ARCHIVO DONDE ESTAN LAS TAREAS GUARDADAS
            const stringJson = fs.readFileSync('./bd.json', 'UTF-8');

            const data = JSON.parse(stringJson);

            //AQUI RECORREMOS EL ARRAY OBTENIDO DEL ARCHIVO CON LAS TAREAS Y COMPARAMOS LA ID QUE HEMOS OBTENIDO
            //CON LAS ID DE LOS ITEMS DEL ARRAY, EN EL IF COMPROBAMOS SI LA ID COINCIDE Y SI ES ASI
            //ACTUALIZAMOS EL CONTENIDO DE ESA POSICION DEL ARRAY.
            for (let i = 0; i < data.tasks.length; i++) {
               // console.log(req.body.data.id);
                if (data.tasks[i].id === parseInt(req.body.data.id)) {
                    console.log("UPDATING");
                    data.tasks[i].color = req.body.data.taskColor;
                    data.tasks[i].text = req.body.data.text;
                    data.tasks[i].completed = req.body.data.completed;
                   //console.log(req.body.data.taskColor);
                    
                    // delete data.tasks[i];


                }

            }

            const newDataString = JSON.stringify(data);
            fs.writeFileSync('./bd.json', newDataString);
            //AL ELIMINAR EL CONTENIDO DEL ARRAY SE NOS QUEDARA COMO NULL EN EL HUECO, POR LO TANTO LO VAMOS A FILTRAR
            //PARA QUE SI ENCUENTRA UN NULL EN ALGUNA DE LAS POSICIONES DEL ARRAY, LO BORRE
            //    const DATA_FILTERED = data.tasks.filter(remove_empty)

            /* function remove_empty(data) {
                 return data !== null;
             }*/
            //AQUI SUSTITUIMOS EL ARAY "FILTRADO" POR EL ORIGINAL
            /* data.tasks = DATA_FILTERED;
             console.log("after:" + data);*/

            //Y CON ESTO GUARDAMOS LOS DATOS MODIFICADOS
            /* const newDataString = JSON.stringify(data);
             fs.writeFileSync('./bd.json', newDataString);*/

            // response to front
            res.json({
                code: 200
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                message: 'something went wrong. my fault. sorry'
            })

        }
    // } else {
    //     res.status(400).json({
    //         message: 'NO TEXT? REALLY? THINK TWICE'
    //     })
    // }

});




app.post( '/tasks', ( req, res ) => {
    
    if ( req.body.text ) {
        try {
            let task = {
                text: req.body.text,
                completed: false,
                id: Date.now(),
                color: "#ffff00"
            }
            // get a parse file  // COGER EL ARCHIVO DONDE ESTAN LAS TAREAS GUARDADAS
            const stringJson = fs.readFileSync( './bd.json', 'UTF-8' );

            const data = JSON.parse( stringJson );
            // add tasks
            data.tasks.push( task );

            //save to file
            const newDataString = JSON.stringify( data );
            fs.writeFileSync( './bd.json', newDataString );

            // response to front
            res.json( { code: 200 } );
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message:'something went wrong. my fault. sorry'})

        }
    } else {
        res.status(400).json({message:'NO TEXT? REALLY? THINK TWICE'})
    }

} );

app.listen( port, () => console.log( 'Servidor levantado en ' + port ) );
