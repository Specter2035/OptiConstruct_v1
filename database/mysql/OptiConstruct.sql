create database OptiConstruct;
use OptiConstruct;

create table Usuarios(
	Id int identity(1,1) primary key,
    NombreCompleto varchar(100) not null,	
    NombreUsuario varchar(100) not null,	
    Contrasenia varchar(100) not null,	
    Correo varchar(100) not null,	
    NumTelefono char(15)not null,
    Tipo int not null
);


create table Clientes(
	Id int identity(1,1) primary key,
	NombreUsuario varchar(100) not null,	
    UsuarioId int not null,
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
);


create table Sucursales( 
    Id int identity(1,1) primary key,
	NombreUsuario varchar(100) not null,	
    UsuarioId int not null,
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id),
    Direccion VARCHAR(150),
	Lat DECIMAL(10,7),
	Lng DECIMAL(10,7)
);

-- SE TENDRIA QUE ALTERAR PARA AGG UBICACION PARA PODER COMPARAR CONLA UBI DEL PROY
-- ALTER TABLE Sucursal
-- ADD COLUMN Direccion VARCHAR(150),
-- ADD COLUMN Lat DECIMAL(10,7),
-- ADD COLUMN Lng DECIMAL(10,7);

create table Material_Sucursal(
	Id int identity(1,1) primary key,
	Nombre_M varchar(100) not null,	
	PrecioBase decimal(10,2) not null,	
	Cantidad decimal(10,2) not null,
    SucursalId int,
    FOREIGN KEY (SucursalId) REFERENCES Sucursales(Id)
);


create table Material(
	Id int identity(1,1) primary key,
	NombreMaterial varchar(100) not null,	
	Descripcion varchar(200) not null,	
	unidadBase varchar(100) not null,
    Categoria varchar(100)
);

-- TABLA USUARIOS
SELECT*FROM USUARIOS;
INSERT INTO USUARIOS ( NombreCompleto, NombreUsuario, Contrasenia, Correo, NumTelefono,Tipo) VALUES
('Pedro Lopez', 'Pedro' , 'Pedro123', 'Pedro123@gmail.com', '8711223344', 1),
('Ferreteria El Triangulo','El triangulo','Triangulo123','triangulo123@gmail.com', '8733445566',2);

INSERT INTO USUARIOS ( NombreCompleto, NombreUsuario, Contrasenia, Correo, NumTelefono,Tipo) VALUES
('Lorena Perez', 'Lorena' , 'Lorena123', 'Lorena123@gmail.com', '8744223344', 1);

-- TABLA CLIENTE
-- INSERT DE 3 CLIENTES--------------
SELECT*FROM CLIENTES;
INSERT INTO Clientes ( NombreUsuario , UsuarioId) VALUES
    ( 'Pedro ',  1 );
  


