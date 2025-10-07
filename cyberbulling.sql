drop database if exists cyberbulling;
create database cyberbulling;
use cyberbulling;

create table Colegio(
	id int primary key auto_increment,
    RazonSocial char(100) not null,
    FileName char(50) );

create table Sede(
	id int primary key auto_increment,
    idColegio int references Colegio(id),
    idDirector int,
    idTutorConvivencia int,
    idPsicologo int,
    UGEL char(20) not null,
	Telefono char(20),
    FileName char(50),
    Distrito char(30) not null,
    Dirección char(100) not null,
    Correo char(100) not null,
    Web char(100) not null,
    Mapa char(100) not null );

create table Docente(
	id int primary key auto_increment,
    idSede int references Sede(id),
    Nombres char(30) not null,
    ApellidoPaterno char(30) not null,
    ApellidoMaterno char(30) not null,
    Dni char(8),
    Passwordd char(20) not null,
    FechaNacimiento date not null,
    Correo char(100) not null,
    Telefono char(20) not null,
    Nivel char(1) not null,
    FileName char(50) );


create procedure sp_getColegios()
	select * from Colegio order by id;

create procedure sp_getColegio(in _id int)
	select * from Colegio where id = _id;

create procedure sp_getColegioByRazonSocial(in _razonSocial char(100))
	select * from Colegio where RazonSocial = _razonSocial;

create procedure sp_getSede(in _id int)
	select * from Sede where id = _id;

create procedure sp_getSedeByDistrito(in _distrito char(30))
	select * from Sede where Distrito = _distrito;
    
create procedure sp_getSedes(in _id int)
	select * from Sede where idColegio = _id;

create procedure sp_getDocente(in _id int)
	select * from Docente where id = _id;
    
create procedure sp_getDocentes(in _idSede int)
	select * from Docente where idSede = _idSede;

delimiter //
create procedure sp_setColegio(in _id int, in _razonSocial char(100), in _archivo char(50) )
	begin
		declare _count int;
        select count(*) into _count from Colegio where RazonSocial = _razonSocial;
        if ( _id = 0 and _count = 0 ) then
			insert Colegio values ( null, _razonSocial, _archivo );
		  else update Colegio set RazonSocial = _razonSocial, FileName = _archivo where id = _id;
		end if;
    end;
//

delimiter //
create procedure sp_setSede(in _id int, in _idColegio int, in _idDirector int, in _idTutorConvivencia int, in _idPsicologo int, in _ugel char(20),
							in _telefono char(20), in _archivo char(50), in _distrito char(30), in _direccion char(100), in _correo char(100),
                            in _web char(20), in _mapa char(100) )
	begin
		declare _count int;
        select count(*) into _count from Sede where Distrito = _distrito;
        if ( _id = 0 and _count = 0 ) then
			insert Sede values ( null, _idColegio, _idDirector, idTutorConvivencia, _idPsicologo, _ugel, _telefono, _archivo, _distrito, _direccion, _correo, _web, _mapa );
		  else update Colegio set UGEL = _ugel, Telefono = _telefono, FileName = _archivo, Distrito = _distrito,
								  Direccion = _direccion, Correo = _correo, Web = _web, Mapa = _mapa
							  where id = _id;
		end if;
    end;
//
    
delimiter //
create procedure sp_setDocente(in _id int, in _idSede int, in _nombres char(20), in _apellidoPaterno char(30), in _apellidoMaterno char(30), in _dni char(8),
		in _passwordd char(20), in _fechaNacimiento date, in _correo char(100), in _telefono char(20), in _nivel char(1), in _archivo char(50) )
	begin
		declare _count int;
        select count(*) into _count from Docente where idSede = _idSede and Dni = _dni;
        if ( _id = 0 and _count = 0 ) then
			insert Docente values ( null, _idSede, _nombres, _apellidoPaterno, _apellidoMaterno, _dni, _dni, _fechaNacimiento, _correo, _telefono, _nivel, _archivo );
		  else update Docente set Nombres = _nombres, ApellidoPaterno = _apellidoPaterno, ApellidoMaterno = _apellidoMaterno, Dni = _dni, Passwordd = _passwordd,
								  FechaNacimiento = _fechaNacimiento, Correo = _correo, Telefono = _telefono, Nivel = _nivel, FileName = _archivo
							  where id = _id;
		end if;
    end;
//

-- call sp_getColegio(1)
-- call sp_getColegioByRazonSocial('colegio 3')
-- call sp_setColegio(0,'C1','A1')
-- call sp_getSedes(1)
-- call sp_getSedeByDistrito('Lima')
-- select * from Sede