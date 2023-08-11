const fs = require("fs");

const fileDB = "koders.json";

const createDbFile = (file) => {
    fs.writeFileSync(file, "[]", "utf-8");
};

if(!fs.existsSync(fileDB)) {
    createDbFile(fileDB);
}

const content = fs.readFileSync(fileDB, "utf-8");
const contentJson = JSON.parse(content);

const createKoder = (koder) => {
    contentJson.push({name: koder});
    fs.writeFileSync(fileDB, JSON.stringify(contentJson), "utf-8");
}

const listAllKoders = () => {
    contentJson.forEach(koder => {
        console.log(koder);
    });
}

const deleteKoder = (koderName) => {
    if(!contentJson.find(koder => koder.name === koderName)) {
        console.log(`No se a encontrado el nombre ${koderName}, por lo cual no se ha podido borrar`);
        process.exit(1);
    }
    let deleteItem = contentJson.filter(koder => koder.name != koderName);
    console.log(deleteItem);
    fs.writeFileSync(fileDB, JSON.stringify(deleteItem), "utf-8");
}

const command = process.argv[2];
const value = process.argv[3];

switch (command) {
    case "add":
        (!value) && console.log("Es necesario ingresar el nombre del Koder") && process.exit(1);
        createKoder(value);
        break;
    case "ls":
        listAllKoders();
        break;
    case "rm":
        (!value) && console.log("Es necesario ingresar el nombre del Koder") && process.exit(1);
        deleteKoder(value);
        break;
    case "reset":
        createDbFile(fileDB);
        break;
    default:
        console.log("Es necesario agregar algún argumento");
        process.exit(1);
        break;
}
