package com.devforo.DevForo.models;

import java.util.Date;

public class RespuestaDetalles {

    private String contenido;
    private Date fechaCreacion;
    private String nombreUsuario;

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    @Override
    public String toString() {
        return "RespuestaDetalles{" +
                "contenido='" + contenido + '\'' +
                ", fechaCreacion=" + fechaCreacion +
                ", nombreUsuario='" + nombreUsuario + '\'' +
                '}';
    }
}

