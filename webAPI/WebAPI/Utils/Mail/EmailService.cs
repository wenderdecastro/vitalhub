using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Security;
using MailKit.Net.Smtp;

namespace WebAPI.Utils.NovaPasta
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings emailSettings;

        public EmailService(IOptions<EmailSettings> options)
        {
            emailSettings = options.Value;
        }

        public async Task SendEmailAync(MailRequest mailRequest)
        {
            try
            {
                var email = new MimeMessage();

                email.Sender = MailboxAddress.Parse(emailSettings.Email);

                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));

                email.Subject = mailRequest.Subject;

                var builder = new BodyBuilder();

                builder.HtmlBody = mailRequest.Body;

                email.Body = builder.ToMessageBody();

                using (var smtp = new SmtpClient())
                {
                    smtp.Connect(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);

                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);

                    await smtp.SendAsync(email);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
