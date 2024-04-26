using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.Utils;
using WebAPI.Utils.Mail;
using WebAPI.Utils.NovaPasta;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacientesController : ControllerBase
    {
        private IPacienteRepository pacienteRepository { get; set; }

        private readonly EmailSendingService _emailSendingService;
        public PacientesController(EmailSendingService emailSendingService)
        {
            pacienteRepository = new PacienteRepository();
            _emailSendingService = emailSendingService;
        }



        [HttpGet("PerfilLogado")]
        public IActionResult BuscarLogado()
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return Ok(pacienteRepository.BuscarPorId(idUsuario));
        }

        //[Authorize]
        [HttpGet("BuscarPorID/{id}")]
        public IActionResult BuscarPorID(Guid id)
        {
            return Ok(pacienteRepository.BuscarPorId(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm]PacienteViewModel pacienteModel)
        {
            try
            {
                Usuario user = new Usuario();

                user.Nome = pacienteModel.Nome;
                user.Email = pacienteModel.Email;
                user.TipoUsuarioId = pacienteModel.IdTipoUsuario;

                var connectionstring = "";
                var containername = "blobvitalhub";

                user.Foto = await AzureBlobStorageHelper.UploadImageBlobAsync(pacienteModel.Arquivo!, connectionstring, containername);
                user.Senha = pacienteModel.Senha;

                user.Paciente = new Paciente();

                user.Paciente.DataNascimento = pacienteModel.DataNascimento;
                user.Paciente.Rg = pacienteModel.Rg;
                user.Paciente.Cpf = pacienteModel.Cpf;

                user.Paciente.Endereco = new Endereco();

                user.Paciente.Endereco.Logradouro = pacienteModel.Logradouro;
                user.Paciente.Endereco.Numero = pacienteModel.Numero;
                user.Paciente.Endereco.Cep = pacienteModel.Cep;

                pacienteRepository.Cadastrar(user);

                await _emailSendingService.SendWelcomeEmail(user.Email!, user.Nome!);

                return Ok("Email enviado.");
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
            
        }


        [Authorize]
        [HttpPut]
        public IActionResult UpdateProfile(PacienteViewModel paciente)
        {
            try
            {
                Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(pacienteRepository.AtualizarPerfil(idUsuario, paciente));

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("BuscarPorData")]
        public IActionResult BuscarPorData(DateTime data, Guid id)
        {
            return Ok(pacienteRepository.BuscarPorData(data, id));
        }


    }
}
