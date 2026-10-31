-- Sample of the Kaggle Titanic training data (21 real passengers)
CREATE TABLE train (
  passenger_id INTEGER PRIMARY KEY, survived INTEGER, pclass INTEGER, name TEXT, sex TEXT,
  age REAL, sibsp INTEGER, parch INTEGER, fare REAL, embarked TEXT
);
INSERT INTO train VALUES
(1,0,3,'Braund, Mr. Owen Harris','male',22,1,0,7.25,'S'),
(2,1,1,'Cumings, Mrs. John Bradley (Florence Briggs Thayer)','female',38,1,0,71.28,'C'),
(3,1,3,'Heikkinen, Miss. Laina','female',26,0,0,7.93,'S'),
(4,1,1,'Futrelle, Mrs. Jacques Heath (Lily May Peel)','female',35,1,0,53.10,'S'),
(5,0,3,'Allen, Mr. William Henry','male',35,0,0,8.05,'S'),
(6,0,3,'Moran, Mr. James','male',NULL,0,0,8.46,'Q'),
(7,0,1,'McCarthy, Mr. Timothy J','male',54,0,0,51.86,'S'),
(8,0,3,'Palsson, Master. Gosta Leonard','male',2,3,1,21.08,'S'),
(9,1,3,'Johnson, Mrs. Oscar W (Elisabeth Vilhelmina Berg)','female',27,0,2,11.13,'S'),
(10,1,2,'Nasser, Mrs. Nicholas (Adele Achem)','female',14,1,0,30.07,'C'),
(11,1,3,'Sandstrom, Miss. Marguerite Rut','female',4,1,1,16.70,'S'),
(12,1,1,'Bonnell, Miss. Elizabeth','female',58,0,0,26.55,'S'),
(13,0,3,'Saundercock, Mr. William Henry','male',20,0,0,8.05,'S'),
(14,0,3,'Andersson, Mr. Anders Johan','male',39,1,5,31.28,'S'),
(15,0,3,'Vestrom, Miss. Hulda Amanda Adolfina','female',14,0,0,7.85,'S'),
(16,1,2,'Hewlett, Mrs. (Mary D Kingcome)','female',55,0,0,16.00,'S'),
(17,0,3,'Rice, Master. Eugene','male',2,4,1,29.13,'Q'),
(22,1,2,'Beesley, Mr. Lawrence','male',34,0,0,13.00,'S'),
(24,1,1,'Sloper, Mr. William Thompson','male',28,0,0,35.50,'S'),
(60,0,3,'Goodwin, Master. William Frederick','male',11,5,2,46.90,'S'),
(160,0,3,'Sage, Master. Thomas Henry','male',NULL,8,2,69.55,'S');
