-- Small tables carried over from the DDL chapter
CREATE TABLE students (
  student_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name    VARCHAR(255) NOT NULL,
  college VARCHAR(255) NOT NULL,
  email   VARCHAR(255) NOT NULL UNIQUE
);
INSERT INTO students (name, college, email) VALUES ('Nitish', 'IIT Madras', 'nitish@gmail.com');

CREATE TABLE passengers (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  VARCHAR(255) NOT NULL,
  email VARCHAR(255)
);
INSERT INTO passengers (name, email) VALUES
('Nitish', 'nitish@gmail.com'), ('Ankit', 'ankit@yahoo.com'), ('Amit', 'amit@gmail.com'),
('Ankita', 'ankita@outlook.com'), ('Neha', 'neha@yahoo.com');
