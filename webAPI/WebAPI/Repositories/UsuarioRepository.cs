using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;
using WebAPI.Utils.Mail;

namespace WebAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        VitalContext ctx = new VitalContext();

        public bool AlterarSenha(string email, string senhaNova)
        {
            try
            {
                var user = ctx.Usuarios.FirstOrDefault(x => x.Email == email);

                if (user == null) return false;

                user.Senha = Criptografia.GerarHash(senhaNova);

                ctx.Update(user);

                ctx.SaveChanges();

                return true;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public void AtualizarFoto(Guid id, string novaUrlFoto)
        {
            try
            {
                Usuario usuarioBuscado = ctx.Usuarios.FirstOrDefault(x => x.Id == id)!;

                if (usuarioBuscado != null)
                {
                    usuarioBuscado.Foto = novaUrlFoto;
                }

                ctx.Update(usuarioBuscado);

                ctx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Usuario BuscarPorEmailESenha(string email, string senha)
        {
            try
            {
                var user = ctx.Usuarios.Select(u => new Usuario
                {
                    Id = u.Id,
                    Email = u.Email,
                    Senha = u.Senha,
                    Nome = u.Nome,
                    TipoUsuario = new TiposUsuario
                    {
                        Id = u.TipoUsuario!.Id,
                        TipoUsuario = u.TipoUsuario.TipoUsuario
                    }
                }).FirstOrDefault
                (x => x.Email == email);

                if (user == null) return null!;

                if (!Criptografia.CompararHash(senha, user.Senha!)) return null!;

                return user;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Usuario BuscarPorId(Guid id)
        {
            try
            {
                return ctx.Usuarios.FirstOrDefault(x => x.Id == id)!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Usuario usuario)
        {
            try
            {
                //Guid.TryParse("3476524F-93BD-4BF1-BA8C-78BA239AEE1D", out var guid);
                usuario.TipoUsuarioId = usuario.TipoUsuarioId;
                usuario.Senha = Criptografia.GerarHash(usuario.Senha!);

                usuario.Paciente = new Paciente();
                usuario.Paciente.Endereco = new Endereco();
                //usuario.Paciente.Id = usuario.Id;

                //    user.Paciente.DataNascimento = pacienteModel.DataNascimento;
                //    user.Paciente.Rg = pacienteModel.Rg;
                //    user.Paciente.Cpf = pacienteModel.Cpf;

                //    user.Paciente.Endereco = new Endereco();

                //    user.Paciente.Endereco.Logradouro = pacienteModel.Logradouro;
                //    user.Paciente.Endereco.Numero = pacienteModel.Numero;
                //    user.Paciente.Endereco.Cep = pacienteModel.Cep;
                //    user.Paciente.Endereco.Cidade = pacienteModel.Cidade;

                //    pacienteRepository.Cadastrar(user);

                

                //    return Ok(user);
                //}
                ctx.Add(usuario);

                ctx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }


    }
}













