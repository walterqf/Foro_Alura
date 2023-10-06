package com.devforo.DevForo.controller;

import com.devforo.DevForo.PublicacionRequest;
import com.devforo.DevForo.models.PublicacionDetalles;
import com.devforo.DevForo.services.PublicacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publicacion")
@CrossOrigin(origins = "http://localhost:5173")
public class PublicacionController {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private PublicacionService publicacionService;

    @GetMapping("/{id}")
    public PublicacionDetalles obtenerDetallesPublicacion(@PathVariable Long id) {
        String sql = "SELECT p.titulo, p.contenido, p.fecha_creacion, u.nombre_usuario " +
                "FROM publicaciones p " +
                "INNER JOIN hilos h ON p.hilo_id = h.id " +
                "INNER JOIN usuarios u ON p.usuario_id = u.id " +
                "WHERE p.id = ?";
        System.out.println(sql);
        List<PublicacionDetalles> resultados = jdbcTemplate.query(
                sql,
                new Object[]{id},
                (rs, rowNum) -> {
                    PublicacionDetalles detalles = new PublicacionDetalles();
                    detalles.setTitulo(rs.getString("titulo"));
                    detalles.setContenido(rs.getString("contenido"));
                    detalles.setFechaCreacion(rs.getDate("fecha_creacion"));
                    detalles.setNombreUsuario(rs.getString("nombre_usuario"));
                    return detalles;
                }
        );

        if (resultados.isEmpty()) {
            // Manejo de error si la publicación no se encuentra
            return null; // O puedes lanzar una excepción personalizada
        } else {
            // Devuelve el primer resultado encontrado
            PublicacionDetalles primerResultado = resultados.get(0);
            System.out.println("Titulo: " + primerResultado.getTitulo());
            System.out.println("Contenido: " + primerResultado.getContenido());
            System.out.println("Fecha de Creación: " + primerResultado.getFechaCreacion());
            System.out.println("Nombre de Usuario: " + primerResultado.getNombreUsuario());
            return primerResultado;
        }
    }

    @PostMapping
    public ResponseEntity<?> crearPublicacion(@RequestBody PublicacionRequest publicacionRequest) {
        try {
            Long nuevaPublicacionId = publicacionService.crearPublicacion(publicacionRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaPublicacionId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear una nueva publicación");
        }
    }
}
