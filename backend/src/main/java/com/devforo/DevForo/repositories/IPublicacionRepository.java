package com.devforo.DevForo.repositories;

import com.devforo.DevForo.models.PublicacionModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPublicacionRepository extends JpaRepository<PublicacionModel, Long> {
}
