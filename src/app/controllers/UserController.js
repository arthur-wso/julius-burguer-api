import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import User from '../models/User.js';

/*

					NÃO PODE SE REPETIR

 * Rotas CRUD de Usuários (Users Controller)
 * store   -> cria um novo usuário        (POST   /users)
 * index   -> lista todos os usuários      (GET    /users)
 * show    -> lista um usuário específico  (GET    /users/:id)
 * update  -> atualiza um usuário          (PUT    /users/:id)
 * delete  -> remove um usuário            (DELETE /users/:id)
 */
class UserController {
	async store(request, response) {
		const schema = Yup.object({
			name: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().min(6).required(),
			admin: Yup.boolean(),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false, strict: true });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		const { name, email, password, admin } = request.body;

		const existingUser = await User.findOne({
			where: {
				email,
			},
		});

		const password_hash = await bcrypt.hash(password, 10);

		if (existingUser) {
			return response.status(400).json({ message: 'Email already taken!' });
		}

		const user = await User.create({
			id: v4(),
			name,
			email,
			password_hash,
			admin,
		});

		return response.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
			admin: user.admin,
		});
	}
}

export default new UserController();
