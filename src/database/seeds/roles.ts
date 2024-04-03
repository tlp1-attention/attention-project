import { DEFAULT_ROLES, Roles } from "../../models/roles";

export async function createRoles() {
    for (const role of DEFAULT_ROLES) {
        await Roles.findOrCreate({
            where: { 
                id: role.id,
                name: role.name
            }
        })
    }
}
