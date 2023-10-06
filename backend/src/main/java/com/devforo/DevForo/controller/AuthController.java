package com.devforo.DevForo.controller;

import com.devforo.DevForo.ErrorResponse;
import com.devforo.DevForo.LoginRequest;
import com.devforo.DevForo.LoginResponse;
import com.devforo.DevForo.TokenUtil;
import com.devforo.DevForo.models.UserModel;
import com.devforo.DevForo.repositories.IUserRepository;
import com.devforo.DevForo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService; // Asegúrate de usar el servicio correcto
    @Autowired
    private IUserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Validar las credenciales
            UserModel usuario = userService.login(loginRequest.getUsername(), loginRequest.getPassword());

            if (usuario != null) {
                // Credenciales válidas, generar un token JWT
                String token = TokenUtil.generateToken(usuario); // Debes implementar TokenUtil para generar el token JWT

                // Devolver el token y cualquier otra información necesaria
                return ResponseEntity.ok(new LoginResponse(token, usuario.getId(), usuario.getNombreUsuario()));
            } else {
                // Credenciales inválidas
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Credenciales inválidas"));
            }
        } catch (Exception e) {
            // Manejar errores internos
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Error de servidor"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserModel user) {
        System.out.println("Cuerpo de la solicitud JSON: " + user.toString());
        try {
            // Puedes agregar validaciones adicionales aquí
            System.out.println("Valor de user: " + user.toString());
            // Guarda el usuario en la base de datos
            UserModel savedUser = userRepository.save(user);


            // Devuelve una respuesta exitosa con el ID del nuevo usuario
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser.getId());
        } catch (Exception e) {
            // Maneja errores internos
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar un nuevo usuario");
        }
    }
}
