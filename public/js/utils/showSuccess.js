function showSucces(title, description) {
    return Swal.fire({
        icon: 'success',
        title,
        text: description
    })
}

export default showSucces;