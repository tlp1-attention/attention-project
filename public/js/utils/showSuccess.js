import Swal from "../../../node_modules/sweetalert2/dist/sweetalert2.js"

function showSucces(title, description) {
    return Swal.fire({
        icon: 'success',
        title,
        text: description
    })
}

export default showSucces;