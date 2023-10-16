export async function getUserInfo(token) {
    try {
        const response = await fetch('/api/users', {
            headers: {
                'Authorization': token
            }
        });

        if (!response.ok) throw response;

        const { user } = await response.json();

        return user;

    } catch(err) {
        console.error(err);
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error al obtener información del usuario',
            footer: 'Si el error persiste, contacte a los desarrolladores del sitio.'
        });
    }
}