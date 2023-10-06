package com.devforo.DevForo.services;

import com.devforo.DevForo.models.UserModel;
import com.devforo.DevForo.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private IUserRepository userRepository;

    public UserModel login(String username, String password) {
        // Buscar al usuario en la base de datos utilizando el método personalizado del repositorio
        UserModel usuario = userRepository.findByNombreUsuarioAndContrasena(username, password);

        if (usuario != null) {
            // Verificar la contraseña sin encriptar
            if (password.equals(usuario.getContrasena())) {
                return usuario; // Credenciales válidas
            }
        }
        return null; // Credenciales inválidas
    }

    // Otros métodos relacionados con usuarios, como registro, actualización, eliminación, etc.
}



    // Otros métodos relacionados con usuarios, como registro, actualización, eliminación, etc.

