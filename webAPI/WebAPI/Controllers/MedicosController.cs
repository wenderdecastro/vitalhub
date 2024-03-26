using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicosController : ControllerBase
    {
        private IMedicoRepository _medicoRepository;
        public MedicosController()
        {
            _medicoRepository = new MedicoRepository();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_medicoRepository.ListarTodos());
        }

        [Authorize]
        [HttpPut]
        public IActionResult AtualizarPerfil(MedicoViewModel medico)
        {
            Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

            return Ok(_medicoRepository.AtualizarPerfil(idUsuario, medico));
        }

        [HttpPost]
        public IActionResult Post(MedicoViewModel Medico)
        {
            Usuario user = new Usuario();

            user.Nome = Medico.Nome;
            user.Email = Medico.Email;
            user.Foto = Medico.Foto;
            user.Senha = Medico.Senha;
            user.TipoUsuarioId = Medico.IdTipoUsuario;

            user.Medico = new Medico();
            user.Medico.Crm = Medico.Crm;
            user.Medico.EspecialidadeId = Medico.EspecialidadeId;
            


            _medicoRepository.Cadastrar(user);

            return Ok();
        }

       


    }
}
