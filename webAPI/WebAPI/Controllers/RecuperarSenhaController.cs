using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Utils.Mail;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecuperarSenhaController : ControllerBase
    {
        private readonly VitalContext _ctx;
        private readonly EmailSendingService _mailService;

        public RecuperarSenhaController(EmailSendingService mailService, VitalContext ctx)
        {
            _mailService = mailService;
            _ctx = ctx;
        }

        [HttpPost]
        public async Task<IActionResult> SendRecoveryCode(string email)
        {
            try
            {
                var user = await _ctx.Usuarios.FirstOrDefaultAsync(x => x.Email == email);
                if (user == null) return NotFound("Usuario não encontrado");

                Random random = new Random();

                int recoveryCode = random.Next(1000, 9999);

                user.CodRecupSenha = recoveryCode;

                await _ctx.SaveChangesAsync();
                await _mailService.SendRecoveryEmail(user.Email, recoveryCode);

                return Ok("Codigo de recuperação enviado com sucesso");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + ex.InnerException);
            }
        }

        [HttpPost("ValidarCodigoRecuperacao")]
        public async Task<IActionResult> ValidateRecoveryCode(string email, int codigo)
        {
            try
            {
                var user = await _ctx.Usuarios.FirstOrDefaultAsync(x => x.Email == email);
                if (user == null) return NotFound("Usuario não encontrado.");
                if (user.CodRecupSenha != codigo) return BadRequest("Código de recuperação inválido.");

                user.CodRecupSenha = null;
                await _ctx.SaveChangesAsync();
                return Ok("Codigo de recuperação válido");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + ex.InnerException);
            }
        }
    }
}
