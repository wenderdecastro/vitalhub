using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.Utils;
using WebAPI.Utils.Mail;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository usuarioRepository { get; set; }
        private IPacienteRepository pacienteRepository { get; set; }
        private readonly EmailSendingService _emailSendingService;
        public UsuarioController(EmailSendingService service)
        {
            usuarioRepository = new UsuarioRepository();
            pacienteRepository = new PacienteRepository();
            _emailSendingService = service;
        }

        [HttpPut("AlterarSenha")]
        public IActionResult UpdatePassword(string email, AlterarSenhaViewModel senha)
        {
            try
            {
             //talvez necessite de alteração   
                usuarioRepository.AlterarSenha(email, senha.SenhaNova!);

                return Ok("Senha alterada com sucesso !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(Usuario usuario)
        {
            try
            {
                usuario.TipoUsuarioId = Guid.Parse("5FF2DF57-1B92-49D0-A516-F2B1172A0EDC");
                usuario.Foto = "semfoto";


                usuarioRepository.Cadastrar(usuario);
                return StatusCode(201, usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpPost]
        //public async Task<IActionResult> Post([FromForm] PacienteViewModel pacienteModel)
        //{
        //    try
        //    {
        //        Usuario user = new Usuario();

        //        user.Nome = pacienteModel.Nome;
        //        user.Email = pacienteModel.Email;
        //        user.TipoUsuarioId = pacienteModel.IdTipoUsuario;

        //        var containerName = "";
        //        var connectionString = "";

        //        user.Foto = await AzureBlobStorageHelper.UploadImageBlobAsync(pacienteModel.Arquivo, connectionString, containerName);
        //        user.Senha = pacienteModel.Senha;

        //        user.Paciente = new Paciente();

        //        user.Paciente.DataNascimento = pacienteModel.DataNascimento;
        //        user.Paciente.Rg = pacienteModel.Rg;
        //        user.Paciente.Cpf = pacienteModel.Cpf;

        //        user.Paciente.Endereco = new Endereco();

        //        user.Paciente.Endereco.Logradouro = pacienteModel.Logradouro;
        //        user.Paciente.Endereco.Numero = pacienteModel.Numero;
        //        user.Paciente.Endereco.Cep = pacienteModel.Cep;
        //        user.Paciente.Endereco.Cidade = pacienteModel.Cidade;

        //        pacienteRepository.Cadastrar(user);

        //        await _emailSendingService.SendWelcomeEmail(user.Email, user.Nome);

        //        return Ok(user);
        //    }
        //    catch (Exception e)
        //    {

        //        return BadRequest(e.Message);
        //    }
        //}

        [HttpGet("BuscarPorId")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                return Ok(usuarioRepository.BuscarPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("AlterarFotoPerfil")]
        public async Task<IActionResult> UpdateProfileImage(Guid id, [FromForm] UsuarioViewModel form)
        {
            try
            {

                Usuario usuarioBuscado = usuarioRepository.BuscarPorId(id);


                if (usuarioBuscado == null)
                {
                    return NotFound();
                }

                var connectionString = "";


                var containerName = "";


                string fotoUrl = await AzureBlobStorageHelper.UploadImageBlobAsync(form.Arquivo!, connectionString!, containerName!);


                usuarioBuscado.Foto = fotoUrl;

                usuarioRepository.AtualizarFoto(id, fotoUrl);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }

}

