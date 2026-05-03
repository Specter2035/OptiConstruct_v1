# OptiConstruct Run Cheat Sheet

## Start The Website

From the project folder:

```bash
cd /home/specter2035/Documents/Tec/ConectividadADatos/OptiConstruct/frontend
php -S localhost:8000
```

Open in your browser:

```text
http://localhost:8000/index.php
```

## Database Settings

The database connection is configured in `php/conexion_be.php`.

```text
Host: localhost
Port: 33065
Database: OptiConstruct
User: root
Password: empty
```

## Required Database

Login and register need a MySQL/MariaDB database named:

```sql
OptiConstruct
```

The PHP files expect a table named `usuarios` with columns similar to:

```sql
IdUsuario
nombre_usuario
correo
Telefono
passw0rd
tipo
```

## Quick Database Example

```sql
CREATE DATABASE IF NOT EXISTS OptiConstruct;
USE OptiConstruct;

CREATE TABLE IF NOT EXISTS usuarios (
    IdUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    passw0rd VARCHAR(255) NOT NULL,
    tipo INT NOT NULL
);
```

## Common Issues

### PHP command not found

Install PHP or start the project using XAMPP/LAMPP.

```bash
php -v
```

### Database connection error

Check that MySQL/MariaDB is running on port `33065`.

Also verify the database name is exactly:

```text
OptiConstruct
```

### Port 8000 already in use

Use another port:

```bash
php -S localhost:8080
```

Then open:

```text
http://localhost:8080/index.php
```

## Main Files

```text
index.php                         Main page
php/conexion_be.php               Database connection
php/login.php                     Login handler
php/registro_usuario_be.php       Register handler
dashboardUsuario.php              User dashboard
dashboardSucursal.php             Branch/company dashboard
css/templatemo-3d-coverflow.css   Main styles
```
