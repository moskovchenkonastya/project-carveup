DROP TABLE IF EXISTS USERS;

CREATE TABLE USERS 
(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Email    VARCHAR(50) NOT NULL,
	Name     VARCHAR(50) NOT NULL,
	Password VARCHAR(50) NOT NULL,
	Surname  VARCHAR(50)
);

INSERT INTO USERS (Email, Password, Name, Surname) VALUES
("LHuyser@gmail.com", "Latina", "Latina", "Huyser"),
("GHougen@gmail.com", "Gladis", "Gladis", "Hougen"),
("Brannan@gmail.com", "Wen", "Wen", "Brannan"),
("MEder@gmail.com", "Maia", "Maia", "Eder"),
("MLytch@gmail.com", "Maybell", "Maybell", "Lytch"),
("DHuggett@gmail.com", "Denna", "Denna", "Huggett"),
("DSeville@gmail.com", "Dimple", "Dimple", "Seville"),
("TOmar@gmail.com", "Tracee", "Tracee", "Omar"),
("Coppinger@gmail.com", "Wes", "Wes", "Coppinger"),
("LHeard@gmail.com", "Leena", "Leena", "Heard"),
("GBorba@gmail.com", "Giovanna", "Giovanna", "Borba"),
("EParada@gmail.com", "Emely", "Emely", "Parada"),
("IPeasley@gmail.com", "Isaac", "Isaac", "Peasley"),
("FMccartney@gmail.com", "Faith", "Faith", "Mccartney"),
("SClark@gmail.com", "Stefani", "Stefani", "Clark"),
("DLunn@gmail.com", "Donita", "Donita", "Lunn"),
("DTrembath@gmail.com", "Donna", "Donna", "Trembath"),
("EBlowers@gmail.com", "Elida", "Elida", "Blowers"),
("RLaramee@gmail.com", "Romeo", "Romeo", "Laramee"),
("CHuerta@gmail.com", "Cherly", "Cherly", "Huerta"),
("SStowers@gmail.com", "Shela", "Shela", "Stowers"),
("DRose@gmail.com", "Danny", "Danny", "Rose"),
("PRein@gmail.com", "Pattie", "Pattie", "Rein"),
("KEwell@gmail.com", "Keith", "Keith", "Ewell"),
("SBrin@gmail.com", "Stanford", "Stanford", "Brin"),
("MHarriman@gmail.com", "Melida", "Melida", "Harriman"),
("EAdamek@gmail.com", "Ernest", "Ernest", "Adamek"),
("WPlaisted@gmail.com", "Wava", "Wava", "Plaisted"),
("DHurlbut@gmail.com", "Delcie", "Delcie", "Hurlbut"),
("YHosch@gmail.com", "Yevette", "Yevette", "Hosch"),
("CRosado@gmail.com", "Carlita", "Carlita", "Rosado"),
("EPhair@gmail.com", "Emeline", "Emeline", "Phair"),
("AHarten@gmail.com", "Alycia", "Alycia", "Harten"),
("MDees@gmail.com", "Masako", "Masako", "Dees"),
("EHiett@gmail.com", "Elana", "Elana", "Hiett"),
("OLaroque@gmail.com", "Olive", "Olive", "Laroque"),
("FBrummitt@gmail.com", "Fausto", "Fausto", "Brummitt"),
("LChadd@gmail.com", "Lashonda", "Lashonda", "Chadd"),
("AMejorado@gmail.com", "Alden", "Alden", "Mejorado"),
("KAllie@gmail.com", "Kelley", "Kelley", "Allie"),
("CEnnis@gmail.com", "Cleta", "Cleta", "Ennis"),
("DLauer@gmail.com", "Deeanna", "Deeanna", "Lauer"),
("LMetzger@gmail.com", "Lourie", "Lourie", "Metzger"),
("AEmbree@gmail.com", "Alfonzo", "Alfonzo", "Embree"),
("ATolley@gmail.com", "Abdul", "Abdul", "Tolley"),
("PGoudreau@gmail.com", "Penney", "Penney", "Goudreau"),
("NSchoonover@gmail.com", "Nathanael", "Nathanael", "Schoonover"),
("MPickrell@gmail.com", "Maura", "Maura", "Pickrell"),
("CPascoe@gmail.com", "Cristina", "Cristina", "Pascoe"),
("Fabian@gmail.com", "Jae", "Jae", "Fabian");

DROP TABLE IF EXISTS CONTACTS;
CREATE TABLE CONTACTS
(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    USER_ID INTEGER,
    Text VARCHAR(50) NOT NULL,
    TYPE VARCHAR(50)
);

INSERT INTO CONTACTS (USER_ID, Text, TYPE) VALUES
(1,"+67867868", "phone"),
(1, "LHuyser@gmail.com", "email"),
(2,"+23432555", "phone"),
(2, "GHougen@gmail.com", "email"),
(3,"+23432908", "phone"),
(3, "Brannan@gmail.com", "email"),
(4,"+879879789", "phone"),
(4, "MEder@gmail.com", "email");