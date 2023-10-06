package com.devforo.DevForo.controller;

import com.devforo.DevForo.InicioData;
import com.devforo.DevForo.models.HiloModel;
import com.devforo.DevForo.models.PublicacionModel;
import com.devforo.DevForo.repositories.IHiloRepository;
import com.devforo.DevForo.repositories.IPublicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/inicio-data")
@CrossOrigin(origins = "http://localhost:5173")
public class InicioController {

    @Autowired
    private IHiloRepository hiloRepository; // Debes crear un repositorio para tus entidades

    @Autowired
    private IPublicacionRepository publicacionRepository; // Debes crear un repositorio para tus entidades

    @GetMapping
    public InicioData getInicioData() {
        // Ejecutar consulta para obtener hilos destacados desde tu repositorio
        List<HiloModel> hilosDestacados = hiloRepository.findAll();

        // Ejecutar consulta para obtener publicaciones destacadas desde tu repositorio
        List<PublicacionModel> publicacionesDestacadas = publicacionRepository.findAll();

        // Crear un objeto InicioData para almacenar los resultados
        InicioData inicioData = new InicioData(hilosDestacados, publicacionesDestacadas);

        return inicioData;
    }
}


