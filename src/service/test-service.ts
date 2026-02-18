import { TestRepository } from '../repository/test-repository';
import { Profile } from '../model/profile';
import bcrypt from 'bcrypt';

class TestService {

    // Declaración
    private repository: TestRepository;

    constructor() {
        // Inicialización
        this.repository = new TestRepository();
    }


    async getTestResponse() {
        const response = await this.repository.getTestResponse();

        if (response) {
            return response;
        }
        else {
            return null;
        }
    }

    // EN DUDA

    // api/src/service/test.service.ts
    async getOne(id: string): Promise<Profile | null> {
        return await this.repository.getOne(id);
    }

    /** api/src/service/test.service.ts
    async create(data: Profile) {
        return await this.repository.create(data);
    } 
    
    Primera versión del método create
    */

    // api/src/service/test.service.ts
    async update(id: string, data: Profile) {
        return await this.repository.update(id, data);
    }

    // api/src/service/test.service.ts
    async delete(id: string) {
        return await this.repository.delete(id);
    }

    async create(data: any): Promise<Profile> {
        if (!data.password) {
            throw new Error('La contraseña es obligatoria');
        }
        // Haseamos la contraseña y se la pasamos a repository para guarda en la BBDD
        const hasedPassword = await bcrypt.hash(data.password, 10);
        const newProfile = { ...data, password: hasedPassword };

        return await this.repository.create(newProfile);
    }

    async authenticate(email: string, plainPassword: string) {
        const user = await this.repository.findByEmail(email);
        if (!user) return null;
        
        const match = await bcrypt.compare(plainPassword, user.password || '');
        if (!match) return null;

        // Sanitize: eliminar password antes de devolver
        const { password, ...safe } = user as any;
        return safe as Profile;
    }
}

export { TestService };