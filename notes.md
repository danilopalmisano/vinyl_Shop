# General Considerations

- Tutto ok! Aggiungete solamente il razionale delle scelte delle librerie aggiuntive (mongoose, zod)
- La creazione degli esempi REST è un plus che avete aggiunto, segnatelo nel README

# Auth

- La richiesta specifica nel documento era quella di permettere la registrazione admin solo agli utenti presenti in una whitelist; siccome la rotta è _diversa_, mi aspetto che se sto provando a registrarmi come admin sulla rotta dedicata ottenga un errore 401/403 se non sono in whitelist


# Products

- La cancellazione di un prodotto non esistente dovrebbe restituire HTTP 404


# Cart

- Se l'utente non ha carrello ed effettua una get cart, sarebbe meglio creare il carrello e restituirlo vuoto
- Se l'utente prova a cancellare dal suo cart un oggetto non esistente nel suo carrello, la risposta dovrebbe essere HTTP 404 e non 500


# Orders

- L'admin deve potere visualizzare l'elenco completo di ordini
- L'update di un ordine deve accettare il valore del nuovo stato nel request body
- (minor) verificare la esistenza dell'ordine con Id passato
