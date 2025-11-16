CREATE DATABASE IF NOT EXISTS todo_app
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'todo_user'@'localhost' IDENTIFIED BY 'YourStrongPassword';
GRANT ALL PRIVILEGES ON todo_app.* TO 'todo_user'@'localhost';
FLUSH PRIVILEGES;
DROP USER IF EXISTS 'todo_user'@'localhost';
FLUSH PRIVILEGES;


CREATE USER 'todo_user'@'localhost' IDENTIFIED BY 'aj2004@AJ';
GRANT ALL PRIVILEGES ON todo_app.* TO 'todo_user'@'localhost';
FLUSH PRIVILEGES;

SELECT User, Host FROM mysql.user;
