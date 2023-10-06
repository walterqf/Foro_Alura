package com.devforo.DevForo;

public class LoginResponse {
    private String token; // El token JWT generado para el usuario
    private Long userId; // El ID del usuario que ha iniciado sesión
    private String username; // El nombre de usuario del usuario

    // Constructores, getters y setters

    public LoginResponse(String token, Long userId, String username) {
        this.token = token;
        this.userId = userId;
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
