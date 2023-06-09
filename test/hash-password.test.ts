import { hashPassword, comparePassword } from '../src/utils/hash'
import { sequelize, Models } from '../src/db'

afterAll(async () => {

    const created = await Users.findAll({
        where: {
            name: 'JohnUser0123'
        }
    });

    await Promise.all(created.map(user => user.destroy()));

    await sequelize.close();
})

const { Users } = Models;

describe('Testing comparing hashed password', () => {

    test('Testing validating existing password', async () => {

        const hashedPassword = await hashPassword('0123456789');

        const mockUser = await Users.create({
            name: 'JohnUser0123',
            password: hashedPassword,
            email: 'example@gmail.com'
        });

        const founded = await Users.findAll({
            where: {
                name: 'JohnUser0123'
            }
        })

        expect(founded.find(user => user.id == mockUser.id))
        .toBeTruthy();

        expect(founded.some(user => {
            return comparePassword('0123456789', user.password);
        }))
        .toBe(true)
    })


})