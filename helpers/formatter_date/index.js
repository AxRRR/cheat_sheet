export function getRealDate() {
    let getRealDate = new Date();
    let getComptDate = getRealDate.getDate() + ' ' + (formatMonth())
        + ' ' + getRealDate.getFullYear();
    let getComptTime = getRealDate.getHours() + ':' + getRealDate.getMinutes(); 

    return { getComptDate, getComptTime };
}

function formatMonth() {
    let getRealDate = new Date();
    let month = getRealDate.getMonth() + 1;

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
            'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    for (let m = 0; m < 12; m++) {
        if(m === month) return months[m-1];
    }
}