drop database if exists cyberbulling;
create database cyberbulling;
use cyberbulling;

create table Colegio(
	id int primary key auto_increment,
    RazonSocial char(100) not null,
    Imagen char(50) );

create table Sede(
	id int primary key auto_increment,
    idColegio int references Colegio(id),
    idDirector int,
    idTutorConvivencia int,
    idPsicologo int,
    UGEL char(20) not null,
	Telefono char(20),
    Imagen char(50),
    Distrito char(30) not null,
    Direccion char(100) not null,
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
    Cargo char(1) not null,
    Imagen char(50) );

create table Grupo(
	id int primary key auto_increment,
    idSede int references Sede(id),
    idTutor int,
    Nivel char(1) not null,			-- I, P, S -> Inicial, Primaria, Secundaria
    Grado char(1) not null,			-- I: 3,4,5 , P: 1..6, S: 1..5
    Seccion char(1) not null,		-- A,B,C
    Turno char(1) not null );		-- M, T -> Mañana, Tarde

create table Apoderado(
	id int primary key auto_increment,
    Nombres char(30) not null,
    ApellidoPaterno char(30) not null,
    ApellidoMaterno char(30) not null,
    Dni char(8) not null,
    Correo char(100),
    Telefono char(20) not null );

create table Alumno(
	id int primary key auto_increment,
    idGrupo int references Grupo(id),
    idApoderado int,
    Tipo char(1),									-- P, M, H, T, A -> Padre, Madre, Hermano(a), Tio(a), Abuelo(a)
    Nombres char(30) not null,
    ApellidoPaterno char(30) not null,
    ApellidoMaterno char(30) not null,
    Dni char(8),
    FechaNacimiento date not null,
    Correo char(100),
    Telefono char(20),
    TikTok char(30),
    Facebook char(30),
    WhatsApp char(30),
    Imagen char(50) );

create table Incidencia(
	id int primary key auto_increment,
    idSede int references Sede(id),
    idDocente int references Docente(id),
    idAlumnoVictima int references Alumno(id),
    idAlumnoAgresor int references Alumno(id),
    FechaCreacion date default current_timestamp,
    FechaLimite date not null,
    TipoRedesSociales int,				-- 1 Facebook, 2 Instagram, 3 TikTok, 4 WhatsApp, 5 Otro
    OtroMedio char(50),
    TipoCaso int,						-- 1 Nuevo, 2 Reingreso, 3 Reincidente
    Estado int,							-- 1 Asignado, 2 En Proceso, 3 Resuelto, 4 Derivado, 5 Pendiente
    NivelRiesgo int,					-- 1 Leve, 2 Grave, 3 Muy Grave, 4 Grave
    Descripcion text,
    NotasAdicionales text );

create table IncidenciaSeguimiento(
	id int primary key auto_increment,
    idIncidencia int references Incidencia(id),
    idDocente int references Docente(id),
    Derivar int,						-- 1 Departamento Psicología, 2 Docente, 3 Tutoría, 4 Coordinación Académica, 5 Cómite Convivencia, 6 Disciplina
    Escalamiento int, 					-- 1 No, 2 Subdirección, 3 Dirección, 4 UGEL, 5 MINEDU, 6 SISEVE, 7 Otros
    Acciones char(10),					-- 1 check, 0 uncheck
    FechaRegistro date not null,
    Titulo char(50) not null,
    Tipo int, 							-- 1 Reporte, 2 Investigación, 3 Reunión, 4 Cierre
    Detalles text );


-- Colegio

create procedure sp_getColegios()
	select * from Colegio order by id;

create procedure sp_getColegio(in _id int)
	select * from Colegio where id = _id;

-- Sede

create procedure sp_getSede(in _id int)
	select * from Sede where id = _id;
    
create procedure sp_getSedes(in _idColegio int)
	select * from Sede where idColegio = _idColegio;
    
-- Docente

create procedure sp_getDocente(in _id int)
	select * from Docente where id = _id;
 
create procedure sp_getDocenteByDni(in _dni char(8))
	select * from Docente where Dni = _dni;

create procedure sp_getDocentes(in _idSede int)
	select * from Docente where idSede = _idSede;

create procedure sp_setDocenteByCargo(in _id int, in _cargo char(1) )
	update Docente set Cargo = _cargo where id = _id;

-- Grupo

create procedure sp_getGrupo(in _id int)
	select * from Grupo where id = _id;

-- Apoderado

create procedure sp_getApoderado(in _id int)
	select * from Apoderado where id = _id;

create procedure sp_getApoderadoByDni(in _dni char(8))
	select * from Apoderado where Dni = _dni;
    
-- Alumno

create procedure sp_getAlumno(in _id int)
	select * from Alumno where id = _id;
 
create procedure sp_getAlumnoByDni(in _dni char(8))
	select * from Alumno where Dni = _dni;

create procedure sp_getAlumnos(in _idGrupo int)
	select * from Alumno where idGrupo = _idGrupo;

-- Incidencia

create procedure sp_getIncidencias(in _idSede int)
	select * from Incidencia where idSede = _idSede;
    

-- Guardar

delimiter //
create procedure sp_setColegio(in _id int, in _razonSocial char(100), in _imagen char(50) )
	if ( _id = 0 ) then
		begin
			declare _count int;
			select count(*) into _count from Colegio where RazonSocial = _razonSocial;
			if ( _count = 0 ) then
				insert Colegio values ( null, _razonSocial, _imagen );
				select last_insert_id() as insertID;
			  else select "Razón Social ya está registrado" as 'error';
			end if;
		end;			
	  else 
        begin
			update Colegio set RazonSocial = _razonSocial, Imagen = _imagen where id = _id;
			if ( row_count() = 0 ) then
				select "Colegio no esta registrado" as 'error';
            end if;
		end;   
	end if;    
//

delimiter //
create procedure sp_setSede(in _id int, in _idColegio int, in _idDirector int, in _idTutorConvivencia int, in _idPsicologo int, in _ugel char(20),
							in _telefono char(20), in _imagen char(50), in _distrito char(30), in _direccion char(100), in _correo char(100),
                            in _web char(20), in _mapa char(100) )
	if ( _id = 0 ) then
		begin
			declare _count int;
			select count(*) into _count from Sede where Distrito = _distrito;
			if ( _count = 0 ) then
				insert Sede values ( null, _idColegio, _idDirector, idTutorConvivencia, _idPsicologo, _ugel, _telefono, _imagen, _distrito, _direccion, _correo, _web, _mapa );
                select last_insert_id() as insertID;
			  else select "Sede ya está registrado" as 'error';
			end if;
        end;
	  else 
		begin
			update Sede set idColegio = _idColegio, idDirector = _idDirector, idTutorConvivencia = _idTutorConvivencia, idPsicologo = _idPsicologo, UGEL = _ugel,
                            Telefono = _telefono, Imagen = _imagen, Distrito = _distrito, Direccion = _direccion, Correo = _correo, Web = _web, Mapa = _mapa
						where id = _id;
			if ( row_count() = 0 ) then
				select "Sede no esta registrada" as 'error';
            end if;
		end;
    end if;
//
    
delimiter //
create procedure sp_setDocente(in _id int, in _idSede int, in _nombres char(20), in _apellidoPaterno char(30), in _apellidoMaterno char(30), in _dni char(8),
		in _passwordd char(20), in _fechaNacimiento date, in _correo char(100), in _telefono char(20), in _nivel char(1), in _cargo char(1), in _imagen char(50) )
	if ( _id = 0 ) then
		begin
			declare _count int;
			select count(*) into _count from Sede where id = _idSede;
            if ( _count = 0 ) then
				select "Sede no está registrada" as 'error';
            end if;
            
            select count(*) into _count from Docente where idSede = _idSede and Dni = _dni;
			if ( _count = 0 ) then
				insert Docente values ( null, _idSede, _nombres, _apellidoPaterno, _apellidoMaterno, _dni, _passwordd, _fechaNacimiento, _correo, _telefono, _nivel, _cargo, _imagen );
                select last_insert_id() as insertID;
			  else select "Docente ya está registrado" as 'error';
			end if;
        end;
	  else 
		begin
			update Docente set Nombres = _nombres, ApellidoPaterno = _apellidoPaterno, ApellidoMaterno = _apellidoMaterno, Dni = _dni, Passwordd = _passwordd,
							   FechaNacimiento = _fechaNacimiento, Correo = _correo, Telefono = _telefono, Nivel = _nivel, Cargo = _cargo, Imagen = _imagen
						   where id = _id;
			if ( row_count() = 0 ) then
				select "Docente no esta registrado" as 'error';
            end if;
		end;
    end if;
//

delimiter //
create procedure sp_setGrupo(in _id int, in _idSede int, in _idTutor int, in _nivel char(1), in _grado char(1), in _seccion char(1), in _turno char(1) )
	if ( _id = 0 ) then
		begin
			declare _count int;
			select count(*) into _count from Sede where id = _idSede;
            if ( _count = 0 ) then
				select "Sede no está registrada" as 'error';
            end if;
            
            select count(*) into _count from Grupo where idSede = _idSede and Nivel = _nivel and Grado = _grado and Seccion = _seccion and Turno = _turno;
			if ( _count = 0 ) then
				insert Grupo values ( null, _idSede, _idTutor, _nivel, _grado, _seccion, _turno );
                select last_insert_id() as insertID;
			  else select "Grupo ya está registrado" as 'error';
			end if;
        end;
	  else 
		begin
			declare _count int;
            select count(*) into _count from Grupo where idSede = _idSede and Nivel = _nivel and Grado = _grado and Seccion = _seccion and Turno = _turno;
            if ( _count = 0 ) then
				update Grupo set idSede = _idSede, idTutor = _idTutor, Nivel = _nivel, Grado = _grado, Seccion = _seccion, Turno = _turno where id = _id;
				if ( row_count() = 0 ) then
					select "Grupo no esta registrado" as 'error';
				end if;
              else select "Grupo ya esta registrado" as 'error';  
			end if;
		end;
    end if;
//

delimiter //
create procedure sp_setApoderado(in _id int, in _nombres char(30), in _apellidoPaterno char(30), in _apellidoMaterno char(30), 
								 in _dni char(8), in _correo char(100), in _telefono char(20) )
	if ( _id = 0 ) then
		begin
            declare _count int;
			select count(*) into _count from Apoderado where Dni = _dni;
			if ( _count = 0 ) then
				insert Apoderado values ( null, _nombres, _apellidoPaterno, _apellidoMaterno, _dni, _correo, _telefono );
                select last_insert_id() as insertID;
			  else select "Apoderado ya está registrado" as 'error';
			end if;
        end;
	  else 
		begin
			update Apoderado set Nombres = _nombres, ApellidoPaterno = _apellidoPaterno, ApellidoMaterno = _apellidoMaterno, Dni = _dni, Correo = _correo, Telefono = _telefono where id = _id;
			if ( row_count() = 0 ) then
				select "Apoderado no esta registrado" as 'error';
            end if;
		end;
    end if;
//

delimiter //
create procedure sp_setAlumno(in _id int, in _idGrupo int, in _idApoderado int, in _tipo char(1), in _nombres char(30), in _apellidoPaterno char(30), in _apellidoMaterno char(30),
								 in _dni char(8), in _fechaNacimiento date, in _correo char(100), in _telefono char(20),
                                 in _tikTok char(30), in _facebook char(30), in _whatsApp char(30), in _imagen char(50) )
	if ( _id = 0 ) then
		begin
			declare _count int;
			select count(*) into _count from Grupo where id = _idGrupo;
            if ( _count = 0 ) then
				select "Grupo no está registrado" as 'error';
            end if;
            
            select count(*) into _count from Alumno where Dni = _dni;
			if ( _count = 0 ) then
				insert Alumno values ( null, _idGrupo, _idApoderado, _tipo, _nombres, _apellidoPaterno, _apellidoMaterno, _dni, _fechaNacimiento, _correo, _telefono, _tikTok, _facebook, _whatsApp, _imagen );
                select last_insert_id() as insertID;
			  else select "Alumno ya está registrado" as 'error';
			end if;
        end;
	  else 
		begin
			update Alumno set idGrupo = _idGrupo, idApoderado = _idApoderado, Tipo = _tipo,
								 Nombres = _nombres, ApellidoPaterno = _apellidoPaterno, ApellidoMaterno = _apellidoMaterno,
                                 Dni = _dni, FechaNacimiento = _fechaNacimiento, Correo = _correo, Telefono = _telefono,
                                 TikTok = _tikTok, Facebook = _facebook, WhatsApp = _whatsApp, Imagen = _imagen 
							where id = _id;
			if ( row_count() = 0 ) then
				select "Grupo no esta registrado" as 'error';
            end if;
		end;
    end if;
//

delimiter //
create procedure sp_setIncidencia(in _id int, in _idSede int, in _idDocente int, in _idAlumnoVictima int, in _idAlumnoAgresor int,
					in _fechaCreacion date, in _fechaLimite date, in _tipoRedesSociales int, in _otroMedio char(50), in _tipoCaso int,
                    in _estado int, in _nivelRiesgo int, in _descripcion text, in _notasAdicionales text )
	if ( _id = 0 ) then
		insert Incidencia values ( null, _idSede, _idDocente, _idAlumnoVictima, _idAlumnoAgresor, _fechaCreacion, _fechaLimite, _tipoRedesSociales, _otroMedio, _tipoCaso, _estado, _niveRiesgo, _descripcion, _notasAdicionales );
		select last_insert_id() as insertID;
	  else
		update Docente set idSede = _idSede, idDocente = _idDocente, idAlumnoVictima = _idAlumnoVictima, idAlumnoAgresor = _idAlumnoAgresor,
						   FechaCreacion = _fechaCreacion, FechaLimite = _fechaLimite, TipoRedesSociales = _tipoRedesSociales, OtroMedio = _otroMedio,
                           TipoCaso = _tipoCaso, Estado = _estado, NivelRiesgo = _nivelRiesgo, Descripcion = _descripcion, NotasAdicionales = _notasAdicionales
					   where id = _id;
		if ( row_count() = 0 ) then
			select "Incidencia no esta registrada" as 'error';
		end if;
    end if;
//

delimiter //
create procedure sp_setSedeByDirector(in _idSede int, in _idDocente int)
	begin
		update Sede set idDirector = _idDocente where id = _idSede;
        if ( row_count() = 0 ) then
			select "Director no se registro" as 'error';
        end if;
	end;
//

delimiter //
create procedure sp_setSedeByTutorConvivencia(in _idSede int, in _idDocente int)
	begin
		update Sede set idTutorConvivencia = _idDocente where id = _idSede;
        if ( row_count() = 0 ) then
			select "Tutor de Convivencia no se registro" as 'error';
        end if;
	end;
//

delimiter //
create procedure sp_setSedeByPsicologo(in _idSede int, in _idDocente int)
	begin
		update Sede set idPsicologo = _idDocente where id = _idSede;
		if ( row_count() = 0 ) then
			select "Psicologo no se registro" as 'error';
        end if;
	end;
//

delimiter //
create procedure sp_setGrupoByTutor(in _idGrupo int, in _idDocente int)
	begin
		update Grupo set idTutor = _idDocente where id = _idGrupo;
		if ( row_count() = 0 ) then
			select "Tutor no se registro" as 'error';
        end if;
	end;
//

-- consultas 

create procedure sp_getGrupos(in _idSede int)
	select g.*, coalesce( concat( trim(d.Nombres), ' ', trim(d.ApellidoPaterno) ), 'Tutor no asignado' ) as 'Tutor',
			case
				when g.Nivel = 'I' then 'Inicial'
				when g.Nivel = 'P' then 'Primaria'
				when g.Nivel = 'S' then 'Secundaria'
			end as 'Nivel Detalle',
			case
				when g.Turno = 'M' then 'Mañana'
				when g.Turno = 'T' then 'Tarde'
			end as 'Turno Detalle'
		from Grupo g, Docente d where g.id = _idSede;

create procedure sp_getIndicencias(in _idSede int)
	select *, 
			case
				when idDocente = 0 then 'Docente no asignado'
				when idDocente > 0 then ( select concat( trim(Nombres), ' ', trim(ApellidoPaterno), ' ', trim(ApellidoMaterno) ) from Docente where id = idDocente ) 
			end as 'Docente',
			case
				when idAlumnoVictima = 0 then 'Víctima no registrado'
				when idAlumnoVictima > 0 then ( select concat( trim(Nombres), ' ', trim(ApellidoPaterno), ' ', trim(ApellidoMaterno) ) from Alumno where id = idAlumnoVictima )
			end as 'Víctima',
			case
				when idAlumnoAgresor = 0 then 'Agresor no registrado'
				when idAlumnoAgresor > 0 then ( select concat( trim(Nombres), ' ', trim(ApellidoPaterno), ' ', trim(ApellidoMaterno) ) from Alumno where id = idAlumnoAgresor )
			end as 'Agresor',            
            case
				when TipoRedesSociales = 1 then 'Facebook'
                when TipoRedesSociales = 2 then 'Intagram'
                when TipoRedesSociales = 3 then 'TikTok'
                when TipoRedesSociales = 4 then 'WhatsApp'
                when TipoRedesSociales = 5 then 'Otro'
			end as 'Rees Sociales',
			case
				when TipoCaso = 1 then 'Nuevo'
                when TipoCaso = 2 then 'Reingreso'
                when TipoCaso = 3 then 'Reincidente'
			end as 'Tipo Caso',
            case
				when Estado = 1 then 'Asignado'
                when Estado = 2 then 'En Proceso'
                when Estado = 3 then 'Resuelto'
                when Estado = 4 then 'Derivado'
                when Estado = 5 then 'Pendiente'
			end as 'Estado',
            case
				when NivelRiesgo = 1 then 'Leve'
                when NivelRiesgo = 2 then 'Grave'
                when NivelRiesgo = 3 then 'Muy Grave'
                when NivelRiesgo = 4 then 'Severo'
			end as 'Nivel Riesgo'
		from Incidencia
        where idSede = _idSede;
        

-- use cyberbulling
-- call sp_getColegios()
-- call sp_getColegioByRazonSocial('colegio 3')
-- call sp_setColegio(0,'colegio 4','imagen colegio 4')
-- call sp_getSedes(1)
-- call sp_getSedeByDistrito('Lima')
-- call sp_getDocentes(2)
-- call sp_getDocente(12)
-- call sp_getDocenteByDni('11223311')
-- call sp_getGruposBySede(1)
-- call sp_getAlumnos(1)
-- call sp_getAlumno(1)
-- call sp_getAlumnoByDni('11223311')
-- call sp_getIndicenciasBySede(1)

-- select * from Sede