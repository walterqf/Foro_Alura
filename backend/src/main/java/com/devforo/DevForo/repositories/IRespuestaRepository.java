package com.devforo.DevForo.repositories;

import com.devforo.DevForo.models.RespuestaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRespuestaRepository extends JpaRepository<RespuestaModel, Long> {
    // Puedes agregar métodos personalizados de consulta si es necesario
}
