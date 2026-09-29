import { Sequelize } from 'sequelize';
import Product from '../app/models/Product.js';
import User from '../app/models/User.js';
import databaseConfig from '../config/database.cjs';

const models = [User, Product];

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
