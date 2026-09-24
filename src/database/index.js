import { Sequelize } from 'sequelize';
import User from '../app/models/User.js';
import databaseConfig from '../config/database.cjs';

const models = [User];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connetion = new Sequelize(databaseConfig);
		models.map((model) => model.init(this.connetion));
	}
}

export default new Database();
