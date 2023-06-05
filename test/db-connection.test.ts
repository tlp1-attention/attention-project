import { sequelize, Models } from '../src/db'



const Usuario = Models['usuario'];

describe('Database tests', () => {
    test('Testing database connection', async () => {
        const _authentication = await sequelize.authenticate();
    })

    test('Testing inserting data', async () => {

        await Usuario.create({
            nombre_usuario: 'JuanZeto01',
            contrasenia: '45678123',
            correo_electronico: 'example@gmail.com'
        });

        await Usuario.destroy({
            where: {
                id_usuario: 1,
            }
        })
    })
})

