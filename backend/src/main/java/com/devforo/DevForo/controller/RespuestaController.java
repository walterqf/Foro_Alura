package com.devforo.DevForo.controller;
import com.devforo.DevForo.RespuestaRequest;
import com.devforo.DevForo.models.RespuestaDetalles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publicacion/{id}/respuestas")
@CrossOrigin(origins = "http://localhost:5173")  // Ajusta el origen permitido según tus necesidades
public class RespuestaController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public List<RespuestaDetalles> obtenerRespuestasPublicacion(@PathVariable Long id) {
        String sql = "SELECT r.contenido, r.fecha_creacion, u.nombre_usuario " +
                "FROM respuestas r " +
                "INNER JOIN usuarios u ON r.usuario_id = u.id " +
                "WHERE r.publicacion_id = ?";

        List<RespuestaDetalles> respuestas = jdbcTemplate.query(
                sql,
                new Object[]{id},
                (rs, rowNum) -> {
                    RespuestaDetalles detalles = new RespuestaDetalles();
                    detalles.setContenido(rs.getString("contenido"));
                    detalles.setFechaCreacion(rs.getDate("fecha_creacion"));
                    detalles.setNombreUsuario(rs.getString("nombre_usuario"));
                    return detalles;
                }
        );

        return respuestas;
    }

    @PostMapping
    public ResponseEntity<?> agregarRespuesta(
            @PathVariable Long id,
            @RequestBody RespuestaRequest respuestaRequest
    ) {
        String contenido = respuestaRequest.getContenido();
        Long usuarioId = respuestaRequest.getUsuarioId();
        System.out.println("id: "+ id +" Contenido: " + contenido + " usuario: " + usuarioId);
        // Realiza una consulta SQL para agregar una nueva respuesta
        String query = "INSERT INTO respuestas (contenido, publicacion_id, usuario_id) VALUES (?, ?, ?)";

        try {
            jdbcTemplate.update(query, contenido, id, usuarioId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Respuesta agregada con éxito");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al agregar una respuesta");
        }
    }
}
