package com.devforo.DevForo.repositories;

import com.devforo.DevForo.models.HiloModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IHiloRepository extends JpaRepository<HiloModel, Long> {
}
