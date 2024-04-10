namespace WebAPI.Utils.NovaPasta
{
    public interface IEmailService
    {
        Task SendEmailAync(MailRequest mailRequest);
    }
}
