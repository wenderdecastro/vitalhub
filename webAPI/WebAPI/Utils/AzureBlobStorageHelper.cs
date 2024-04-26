using Azure.Storage.Blobs;

namespace WebAPI.Utils
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
            try
            {
                //verifica se existe o arquivo
                if (arquivo != null)
                {
                    //gera um nome unico para a imagem
                    string blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);

                    //cria uma instancia do BlobServiceClient passando a string de conexao com o blob da Azure
                    BlobServiceClient blobServiceClient = new BlobServiceClient(stringConexao);

                    //obtem dados do container cliente
                    BlobContainerClient blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);

                    //obtem um blobClient usando o blobName
                    BlobClient blobClient = blobContainerClient.GetBlobClient(blobName);

                    //abre o fluxo de entrada do arquivo(foto)
                    using (var stream = arquivo.OpenReadStream())
                    {
                        //carrega o arquivo(foto) para o blob de forma assíncrona
                        await blobClient.UploadAsync(stream, true);
                    }

                    //retorna a uri do blob como uma string
                    return blobClient.Uri.ToString();

                }
                else
                {
                    //retorna a uri de uma imagem padrão caso nenhuma imagem seja enviada na requisçao
                    return "https://storagevitalhub.blob.core.windows.net/blobvitalhub/placeholder.jpg";
                }
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
    }
}
