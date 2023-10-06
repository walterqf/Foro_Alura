package com.devforo.DevForo.controller;

import com.devforo.DevForo.models.HiloModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hilos")
@CrossOrigin(origins = "http://localhost:5173")  // Ajusta el origen permitido según tus necesidades
public class HiloController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerDetallesHilo(@PathVariable Long id) {
        String query = "SELECT * FROM hilos WHERE id = ?";

        try {
            // Realiza una consulta SQL para obtener los detalles del hilo por su ID
            HiloModel hilo = jdbcTemplate.queryForObject(
                    query,
                    new Object[]{id},
                    (rs, rowNum) -> {
                        HiloModel hiloModel = new HiloModel();
                        hiloModel.setId(rs.getLong("id"));
                        hiloModel.setTitulo(rs.getString("titulo"));
                        hiloModel.setContenido(rs.getString("contenido"));
                        hiloModel.setFechaCreacion(rs.getDate("fecha_creacion"));
                        // Agrega aquí los demás campos que quieras mapear
                        return hiloModel;
                    }
            );

            if (hilo == null) {
                // Si no se encuentra el hilo, devuelve un código de estado 404 (No encontrado)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hilo no encontrado");
            } else {
                // Si se encuentra el hilo, devuelve los detalles como respuesta
                return ResponseEntity.ok(hilo);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al obtener los detalles del hilo");
        }
    }
}
