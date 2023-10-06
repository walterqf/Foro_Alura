package com.devforo.DevForo;

import com.devforo.DevForo.models.HiloModel;
import com.devforo.DevForo.models.PublicacionModel;

import java.util.List;

public class InicioData {
    private List<HiloModel> hilosDestacados;
    private List<PublicacionModel> publicacionesDestacadas;

    // Constructor, getters y setters
    public InicioData(List<HiloModel> hilosDestacados, List<PublicacionModel> publicacionesDestacadas) {
        this.hilosDestacados = hilosDestacados;
        this.publicacionesDestacadas = publicacionesDestacadas;
    }

    public List<HiloModel> getHilosDestacados() {
        return hilosDestacados;
    }

    public void setHilosDestacados(List<HiloModel> hilosDestacados) {
        this.hilosDestacados = hilosDestacados;
    }

    public List<PublicacionModel> getPublicacionesDestacadas() {
        return publicacionesDestacadas;
    }

    public void setPublicacionesDestacadas(List<PublicacionModel> publicacionesDestacadas) {
        this.publicacionesDestacadas = publicacionesDestacadas;
    }
}
