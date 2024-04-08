//ENVIRONMENT --> permette di poter settare vari ambienti

import { env } from "./utility/env";

//enum è un modo per creare delle variabili che devono essere fisse
enum Environments {
	LOCAL = "local", //se siamo in locale
	DEV = "dev", //se siamo in sviluppo
	PROD = "prod", //se siamo in produzione
}

//class Environment, tramite incapsulamento della programmazione ad oggetti
//i dati e i metodi interni dell'oggetto sono nascosti all'utente
//possono essere modificati ed esposti all'esterno solo con opportune interfacce definite internamente alla classe (metodi)
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
