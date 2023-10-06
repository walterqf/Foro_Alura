package com.devforo.DevForo.repositories;

import com.devforo.DevForo.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface IUserRepository extends JpaRepository<UserModel, Long> {
    UserModel findByNombreUsuarioAndContrasena(@Param("username") String username, @Param("password") String password);
}

