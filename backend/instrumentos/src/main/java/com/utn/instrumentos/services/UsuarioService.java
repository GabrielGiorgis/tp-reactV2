package com.utn.instrumentos.services;

import com.utn.instrumentos.entities.Usuario;
import com.utn.instrumentos.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.OffsetScrollPositionHandlerMethodArgumentResolver;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private OffsetScrollPositionHandlerMethodArgumentResolver offsetResolver;

    public List<Usuario> findAll() {return usuarioRepository.findAll();}
    public Usuario findById(Long id) {return usuarioRepository.findById(id).orElse(null);}
    public Usuario save(Usuario usuario) {
        usuario.setContrasenia(getMd5Password(usuario.getContrasenia()));
        return usuarioRepository.save(usuario);
    }
    public void delete(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario != null) {
            usuarioRepository.delete(usuario);
        }
    }
    public Usuario update(Usuario usuario) {return usuarioRepository.save(usuario);}
    public Usuario compareUsuarios (Usuario usuario){
        List<Usuario> usuarios = usuarioRepository.findAll();
        for (Usuario u : usuarios) {
            if (u.getContrasenia().equals(getMd5Password(usuario.getContrasenia())) && u.getNombreUsuario().equals(usuario.getNombreUsuario())){
                System.out.println("SE ENCONTRO EL USUARIO");
                return u;
            }
        }
        System.out.println("NO SE ENCONTRO EL USUARIO");
        return null;
    }

    public String getMd5Password(String password) {
        try{
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(password.getBytes());
            BigInteger number = new BigInteger(1, messageDigest);
            String hashtext = number.toString(16);

            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        }catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
