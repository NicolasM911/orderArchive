const fs = require('fs');
const rutaDescargas = 'C:/Users/Nicolas/Downloads'; // Asegúrate de que esta sea la ruta correcta
const extensiones = [
    /\.txt$|\.pdf$|\.docx$|\.pptx$/,
    /\.png$|\.jpg$|\.jpeg$|\.gif$|\.ico$|\.jfif$/,
    /\.mp4$/,
    /\.mp3$/,
    /\.exe$|\.msi$/,
    /\.rar$|\.zip$/,
    /\.sql$/,
    /\.pkt$/,
    /\.tm7$|\.htm$/
];

fs.readdir(rutaDescargas, (err, files) => {
    if (err) {
        console.error('Error al leer el directorio:', err);
        return;
    }

    files.forEach(archivo => {
        const extensionEncontrada = extensiones.find(extension => buscar(extension, archivo));
        if (extensionEncontrada) {
            const carpeta = obtenerNombreCarpeta(extensionEncontrada);
            mover(carpeta, archivo);
        }
    });
});

function mover(carpeta, archivo) {
    const oldPath = rutaDescargas + '/' + archivo;
    const newPath = rutaDescargas + `/${carpeta}/` + archivo;
    
    fs.mkdir(`${rutaDescargas}/${carpeta}`, { recursive: true }, (err) => {
        if (err) {
            console.error('Error al crear la carpeta:', err);
            return;
        }
        
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error('Error al mover el archivo:', err);
                return;
            }
            console.log(archivo + ' fue movido exitosamente');
        });
    });
}

function buscar(expresion, archivo) {
    const er = new RegExp(expresion);
    return er.test(archivo);
}

function obtenerNombreCarpeta(expresion) {
    if (expresion.toString() === extensiones[0].toString()) return 'documentos';
    if (expresion.toString() === extensiones[1].toString()) return 'images';
    if (expresion.toString() === extensiones[2].toString()) return 'videos';
    if (expresion.toString() === extensiones[3].toString()) return 'audios';
    if (expresion.toString() === extensiones[4].toString()) return 'programas';
    if (expresion.toString() === extensiones[5].toString()) return 'comprimidos';
    if (expresion.toString() === extensiones[6].toString()) return 'archivosSQL';
    if (expresion.toString() === extensiones[7].toString()) return 'packetTracer';
    if (expresion.toString() === extensiones[8].toString()) return 'modeladoAmenazas';
    
    return 'otros';
}
