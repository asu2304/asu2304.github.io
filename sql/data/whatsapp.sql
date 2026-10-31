-- A tiny WhatsApp-style database: users, groups, and who is in which group (many-to-many)
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY, name TEXT, age INTEGER,
  emergency_contact INTEGER          -- another user_id
);
INSERT INTO users VALUES
(1,'Nitish',34,11),(2,'Ankit',32,1),(3,'Neha',23,1),(4,'Radhika',22,1),
(7,'Anant',27,1),(8,'Abhinav',30,11),(11,'Rahul',29,8);

CREATE TABLE groups (group_id INTEGER PRIMARY KEY, group_name TEXT);
INSERT INTO groups VALUES (1,'Family'),(2,'College Friends'),(3,'Office'),(4,'Cricket Club');

-- user_id 5 and 6 have since deleted their accounts (no longer in users);
-- users 8 (Abhinav) and 11 (Rahul) are in no group
CREATE TABLE membership (membership_id INTEGER PRIMARY KEY, user_id INTEGER, group_id INTEGER);
INSERT INTO membership VALUES
(1,1,1),(2,1,2),(3,2,1),(4,3,3),(5,4,1),(6,5,2),(7,6,4),(8,7,3);

CREATE TABLE employees (emp_id INTEGER PRIMARY KEY, name TEXT, manager_id INTEGER);
INSERT INTO employees VALUES
(1,'Ankit',NULL),(2,'Martina',1),(3,'Rahul',2),(4,'Sneha',2),(5,'Vikas',1),(6,'John',5);
