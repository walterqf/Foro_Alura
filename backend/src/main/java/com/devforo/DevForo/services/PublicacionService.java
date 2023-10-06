package com.devforo.DevForo.services;

import com.devforo.DevForo.PublicacionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Service
public class PublicacionService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Long crearPublicacion(PublicacionRequest publicacionRequest) {
        String titulo = publicacionRequest.getTitulo();
        String contenido = publicacionRequest.getContenido();
        Long hiloId = publicacionRequest.getHiloId();
        Long usuarioId = publicacionRequest.getUsuarioId();
        System.out.println("publicacion:"+ publicacionRequest.toString());
        // Realiza una consulta SQL para insertar una nueva publicación
        String query = "INSERT INTO publicaciones (titulo, contenido, fecha_creacion, hilo_id, usuario_id) VALUES (?, ?, NOW(), ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, titulo);
            ps.setString(2, contenido);
            ps.setLong(3, hiloId);
            ps.setLong(4, usuarioId);
            return ps;
        }, keyHolder);

        return keyHolder.getKey().longValue();
    }
}
