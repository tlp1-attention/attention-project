import { hashPassword, comparePassword } from '../src/utils/hash'
import { sequelize, Models } from '../src/db'

afterAll(async () => {

    const created = await Usuario.findAll({
        where: {
            nombre_usuario: 'JohnUser0123'
        }
    });

    await created.forEach(async user => await user.destroy());
})

const { usuario: Usuario } = Models;

describe('Testing comparing hashed password', () => {

    test('Testing validating existing password', async () => {

        const hashedPassword = await hashPassword('0123456789');

        const mockUser = await Usuario.create({
            nombre_usuario: 'JohnUser0123',
            contrasenia: hashedPassword,
            correo_electronico: 'example@gmail.com'
        });

        const finded = await Usuario.findAll({
            where: {
                nombre_usuario: 'JohnUser0123'
            }
        })

        expect(finded.find(user => user.id_usuario == mockUser.id_usuario))
        .toBeTruthy();

        expect(finded.some(user => {
            return comparePassword('0123456789', user.contrasenia);
        }))
        .toBe(true)
    })


})