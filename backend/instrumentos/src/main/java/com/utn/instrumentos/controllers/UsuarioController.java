package com.utn.instrumentos.controllers;

import com.utn.instrumentos.entities.Usuario;
import com.utn.instrumentos.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/")
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return usuarioService.save(usuario);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.delete(id);
    }

    @GetMapping("/{id}")
    public Usuario getUsuarioById(@PathVariable Long id) {return usuarioService.findById(id);}

    /*@GetMapping("/autentificacion")
    public Usuario verificacionUsuario(@RequestBody Usuario usuario) {
        return usuarioService.compareUsuarios(usuario);
    }*/
    @GetMapping("/autenticacion/{nombre}-{contrasenia}")
    public Usuario verificacionUsuario(@PathVariable String nombre, @PathVariable String contrasenia) {
        Usuario usuario = new Usuario();
        usuario.setContrasenia(contrasenia);
        usuario.setNombreUsuario(nombre);
        return usuarioService.compareUsuarios(usuario);
    }

}
