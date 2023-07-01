async function promptUser(
    {
      title, message, type = 'text',
      confirmText = 'Sí', cancelText = 'Cancelar'
    }
  ) {
    const result = Swal.fire({
        title: title,
        text: message,
        icon: type,
        showCancelButton: true,
        confirmButtonColor: 'var(--clr-accent-800)',
        cancelButtonColor: 'var(--clr-red-600)',
        confirmButtonText: confirmText,
        cancelButtonText: cancelText
      });
  
    return result;
}

export default promptUser;