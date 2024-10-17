const colors = require('colors');
const readline = require('readline-sync');
const fs = require('fs');

//------Declaracion de variables-------
const pathUsers = "C:/Users/Maldor Hp omen/Desktop/cursoNode/Ejercicios/02-Menu/data/usuarios.json";

//-----------------Declaracion de funciones --------------------------------
function addUser() {
    console.clear();
    const name = readline.question("Ingrese el nombre del usuario: ".blue);
    if (searchUsers(name)) {
        console.log(`El usuario ${name} ya existe.`.yellow);
    } else {
        const age = readline.questionInt("Ingrese la edad del usuario: ".blue);
        const data = loadDataJson();
        data.push({ name, age });
        saveDataJson(data);
        console.log(`Usuario ${name} agregado correctamente`.green);
    }
    readline.question("Presione cualquier tecla para continuar...".cyan);
}

function loadDataJson() {
    try {
        const data = fs.readFileSync(pathUsers, 'utf8');
        return data ? JSON.parse(data) : []; // Retorna un array vacío si no hay datos
    } catch (error) {
        console.error("Error al leer el fichero de usuarios:", error);
    }
}


function saveDataJson(data) {
    const jsonString = JSON.stringify(data);
    try {
        fs.writeFileSync(pathUsers, jsonString, 'utf-8');
    } catch (error) {
        console.error("Error al escribir el fichero de usuarios:", error);
    }
}

function listUsers() {
    console.clear();
    const users = loadDataJson();
    if (users.length === 0) {
        console.log("No hay usuarios registrados.".yellow);
    } else {
        console.log("Lista de usuarios:".green);
        users.forEach((user, index) => {
            console.log(`${index + 1}. Nombre: ${user.name}, Edad: ${user.age}`);
        });
    }
    readline.question("Presione cualquier tecla para continuar...".cyan);
}

function searchUsers(name) {
    const users = loadDataJson();
    const foundUser = users.find(usr => usr.name === name);
    if (foundUser) {
        console.log(`Usuario encontrado: Nombre: ${foundUser.name}, Edad: ${foundUser.age}`.green);
        return true;
    };
    return false;

}

function deleteUsers() {
    console.clear();
    const name = readline.question("Ingrese el nombre del usuario a eliminar: ".blue);
    const users = loadDataJson();
    const updatedUsers = users.filter(user => user.name !== name);

    if (updatedUsers.length < users.length) {
        saveDataJson(updatedUsers);
        console.log(`Usuario ${name} eliminado correctamente.`.green);
    } else {
        console.log(`No se encontró un usuario con el nombre ${name}.`.red);
    }
    readline.question("Presione cualquier tecla para continuar...".cyan);
}

function menu() {
    console.clear();
    console.log("===========".green);
    console.log("Aplicación de Usuarios".green);
    console.log("1. Agregar Usuario".green);
    console.log("2. Listar Usuarios".green);
    console.log("3. Buscar Usuario por Nombre".green);
    console.log("4. Eliminar Usuario por Nombre".green);
    console.log("5. Salir".green);

    const opt = readline.questionInt("Seleccione una opcion (1-5): ".yellow);
    switch (opt) {
        case 1:
            addUser();
            menu();
            break;
        case 2:
            listUsers();
            menu();
            break;
        case 3:
            const name = readline.question("Ingrese el nombre del usuario a buscar: ".blue);
            searchUsers(name);
            break;
        case 4:
            deleteUsers();
            menu();
            break;
        case 5:
            console.log("Gracias por usar la aplicacion".green);
            return;
        default:
            console.log("Error, opcion no disponible".red);
            menu();
            break;
    }
}

//--------------Inicio de la Aplicación --------------------
menu();
