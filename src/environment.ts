// ENVIRONMENT --> allows to set different environments

import { env } from "./utility/env";

// enum is a way to create variables that must be fixed
enum Environments {
	LOCAL = "local", // if we are in local
	DEV = "dev", // if we are in development
	PROD = "prod", // if we are in production
}

// class Environment, through object-oriented programming encapsulation
// the data and methods within the object are hidden from the user
// they can be modified and exposed outside only through appropriate interfaces defined internally to the class (methods)
class Environment {
	private environment: String;

	constructor(environment: String) {
		this.environment = environment;
	}

	public getPort = (): Number => {
		if (this.environment === Environments.DEV) {
			return env.DEV_PORT;
		} else if (this.environment === Environments.PROD) {
			return env.PROD_PORT;
		} else {
			return env.LOCAL_PORT;
		}
	};

	public getDBName = (): String => {
		if (this.environment === Environments.DEV) {
			return env.DEV_DBNAME;
		} else if (this.environment === Environments.PROD) {
			return env.PROD_DBNAME;
		} else {
			return env.LOCAL_DBNAME;
		}
	};
}

export default new Environment(Environments.LOCAL);
