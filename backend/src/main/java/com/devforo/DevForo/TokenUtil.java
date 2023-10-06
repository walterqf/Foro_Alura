package com.devforo.DevForo;

import com.devforo.DevForo.models.UserModel;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class TokenUtil {
    private static final String SECRET_KEY = "mipass"; // Cambia esto a tu propia clave secreta

    public static String generateToken(UserModel usuario) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + 3600000); // 1 hora de expiración

        return Jwts.builder()
                .setSubject(usuario.getNombreUsuario())
                .claim("userId", usuario.getId())
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }
}
