import Usuario from "../types/Usuario";

export class UsuarioService {
    usuario: null;
    constructor() {
        this.usuario = null;
    }

    async login(usuario: string, clave: string) {
        try {
            const user = await fetch(`http://localhost:8080/api/usuarios/autenticacion/${usuario}-${clave}`).then(response => response.json());
            console.log(user)
            return user;
        } catch (error) {
            return null;
        }
    }

    async register(nombreUsuario: string, contrasenia: string, rol: string) {
        try {
            if (rol === "") {
                rol = "VISOR";
            }
            console.log({ nombreUsuario, contrasenia, rol })
            const user = await fetch("http://localhost:8080/api/usuarios/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombreUsuario, contrasenia, rol }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            console.log(user);
            return user;
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    }


    async getUsuarioByid(id: number): Promise<Usuario | undefined> {
        try {
            const user = await fetch(`http://localhost:8080/api/usuarios/${id}`).then(response => response.json());
            return user;
        } catch (error) {
            console.error('Error al obtener usuario:', error);
        }
        return undefined;
    }
}   