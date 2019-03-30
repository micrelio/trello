
//console.log(process.env.NODE_ENV);


const environments={
    production:"production",
    development:"development",
    test:"test"
}
const ENV = process.env.NODE_ENV || environments.development;
//console.log(ENV);
const config={
    [environments.production]:{
        PORT:80,
        MongoDB:{
            PORT:27017,
            HOST:'localhost',
            DB:'local'
        }
    },
    [environments.development]:{
        PORT:3000,
        MongoDB:{
            PORT:27017,
            HOST:'localhost',
            DB:'local_dev'
        }

    },
    [environments.test]:{
        PORT:3000,
        MongoDB:{
            PORT:27017,
            HOST:'localhost',
            DB:'local_test'
        }

    },
}

const CONFIG = config[ENV];
if (!CONFIG) {
    throw new Error (`NODE_ENV=${ENV}is not valid environment.`);
}

process.env={
    ...process.env,
    ...CONFIG
}
//console.log(process.env);
//console.log('micro')