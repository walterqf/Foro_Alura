package com.devforo.DevForo;

public class PublicacionRequest {
    private String titulo;
    private String contenido;
    private Long hiloId;

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public Long getHiloId() {
        return hiloId;
    }

    public void setHiloId(Long hiloId) {
        this.hiloId = hiloId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    private Long usuarioId;
}
